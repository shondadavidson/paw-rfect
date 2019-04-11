const path = require('path');
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)
const socket = require('socket.io')

const ac = require('./controllers/auth_controller')
const uc = require('./controllers/user_controller')

const app = express()
const AWS = require('aws-sdk');

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env



const pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

app.use(express.json())
app.use(session({
  store: new pgSession({
    pool: pgPool,
    pruneSessionInterval: 60 * 60 * 24
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1231232223211
  }
}))

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)

})

//Amazon s-3

console.log({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
// with those settings applied make an interface with s3
const S3 = new AWS.S3();

// because the file upload is such a large string the body parser is not equiped to handle it. this allows you to upload files through the body.
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post('/api/s3', (req, res) => {
  // the body contains the string that is the photo
  const photo = req.body;

  // the photo string needs to be converted into a 'base 64' string for s3 to understand how to read the image
  // console.log(photo.file.replace(/^data:image\/\w+;base64,/, ''))
  const buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  // this is the object that we will end to s3 with all the info about the photo, and the photo itself.
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Body: buf,
    Key: photo.filename,
    ContentType: photo.filetype,
    ACL: 'public-read',
  };

  console.log('hit 74', params)

  // using the S3 object we made above the endpoints we will pass it the image we want uploaded and the funciton to be run when the upload is finished.
  S3.upload(params, (err, data) => {
    console.log('hit 76', err, data)
    let response, code;
    if (err) {
      response = err;
      code = 500;
    } else {
      response = data;
      code = 200;
    }
    // if the upload was sucessfull give them the data, if not send them the error
    res.status(code).send(response);
  });
});



//Auth_controller
app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.post('/auth/logout', ac.logout)

app.get('/api/current', ac.getUser)

//user_controller

app.get('/api/getMyProviders/:id', uc.getMyProviders)
app.post('/api/provider/:id', uc.provider)
app.get('/api/searchProviders/:zip', uc.searchProviders)
app.post('/api/addProvider/:id', uc.addProvider)

// SOCKETS

const io = socket(app.listen(SERVER_PORT, () => console.log('Sweeettt')))

io.on('connection', function (socket) {

  socket.on('joinRoom', room => {
    console.log('join room', room)
    socket.join(room)
  })

  socket.on('leaveRoom', function (roomName) {
    socket.leave(roomName)
  })

  socket.on('sendMsg', async data => {
    console.log('data received', data)
    const { room, msg, user } = data
    const db = app.get('db')
    await db.chat.create_message({ room: room, message: msg, user_name: user })
    let messages = await db.chat.get_message_history({ room: room })
    io.to(data.room).emit('sendMsg', messages)
    console.log(messages)
  })

})