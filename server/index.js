const path = require('path');
require('dotenv').config()
const express = require ('express')
const session = require ('express-session')
const massive = require ('massive')
const pg = require ('pg')
const pgSession = require('connect-pg-simple')(session)
const socket = require('socket.io')

const ac = require('./controllers/auth_controller')
const uc = require('./controllers/user_controller')

const app = express()
const aws = require('aws-sdk');

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env



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

app.get('/api/signs3', (req, res) => {
    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };
  
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      };
  
      return res.send(returnData);
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

io.on('connection', function(socket) {

  socket.on('joinRoom', room => {
    console.log('join room',room)
    socket.join(room)
  })

  socket.on('leaveRoom', function(roomName){
    socket.leave(roomName)
  })

  socket.on('sendMsg', async data => {
    console.log('data received', data)
    const {room, msg, user} = data
    const db = app.get('db')
    await db.chat.create_message({room: room, message: msg, user_name: user})
    let messages = await db.chat.get_message_history({room:room})
    io.to(data.room).emit('sendMsg', messages)
    console.log(messages)
  })

})