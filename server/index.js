const path = require('path');
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)
const socket = require('socket.io')

const ac = require('./controllers/auth_controller')
const cc = require('./controllers/chat_controller')
const uc = require('./controllers/user_controller')
const pc = require('./controllers/provider_controller')

const app = express()
const AWS = require('aws-sdk');

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.static(`${__dirname}/../build`))

const pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

// app.use(express.json())
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

app.post('/api/uploadOwner', (req, res) => {
  // the body contains the string that is the photo
  const photo = req.body;
  console.log(111, req.body)
  let file = photo.file.replace(/^data:image\/\w+;base64,/, '')
  // the photo string needs to be converted into a 'base 64' string for s3 to understand how to read the image
  // console.log(photo.file.replace(/^data:image\/\w+;base64,/, ''))
  const buf = new Buffer.from(file, 'base64');

  // this is the object that we will end to s3 with all the info about the photo, and the photo itself.
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Body: buf,
    Key: photo.filename,
    ContentType: photo.filetype,
    ACL: 'public-read',
  };

  // using the S3 object we made above the endpoints we will pass it the image we want uploaded and the funciton to be run when the upload is finished.
  S3.upload(params, (err, data) => {
    console.log(22222, data)
    
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

app.post('/api/uploadDog', (req, res) => {
  // the body contains the string that is the photo
  const photo = req.body;
  let file = photo.file.replace(/^data:image\/\w+;base64,/, '')
  // the photo string needs to be converted into a 'base 64' string for s3 to understand how to read the image
  // console.log(photo.file.replace(/^data:image\/\w+;base64,/, ''))
  const buf = new Buffer.from(file, 'base64');

  // this is the object that we will end to s3 with all the info about the photo, and the photo itself.
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Body: buf,
    Key: photo.filename,
    ContentType: photo.filetype,
    ACL: 'public-read',
  };

  // using the S3 object we made above the endpoints we will pass it the image we want uploaded and the funciton to be run when the upload is finished.
  S3.upload(params, (err, data) => {
    console.log(3333, data)
    
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
app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.post("/auth/logout", ac.logout);

app.get("/api/current", ac.getUser);

// chat_controller
app.get('/api/getChat/:id', cc.getChat)
app.get('/api/getInbox/:id', cc.getInbox)
app.get('/api/getNewMessageCount/:id', cc. getNewMessageCount)
app.put('/api/read/:id', cc.read)

//provider_controller
app.get('/api/getClients/:id', pc.getClients)
app.get('/api/getClientRequests/:id', pc.getClientRequests)
app.get('/api/getRequestCount/:id', pc.getRequestCount)
app.get('/api/getWalking/:id', pc.getWalking)
app.post('/api/pickup/:id', pc.pickup)
app.put('/api/dropoff/:id', pc.dropoff)
app.put('/api/acceptRequest/:id', pc.acceptRequest)
app.put('/api/denyRequest/:id', pc.acceptRequest)


//user_controller

app.get('/api/getMyProviders/:id', uc.getMyProviders)
app.post('/api/provider/:id', uc.provider)
app.get('/api/searchProviders/:zip', uc.searchProviders)
app.post('/api/addProvider/:id', uc.addProvider)
app.post('/api/dropoff/:id', pc.dropoff)
app.post('/api/removeProvider/:id', uc.removeProvider)
app.get('/api/dogStatus/:id', uc.walkStatus)

app.post('/api/addDog/:id', uc.addDog)
app.get('/api/getDogs/:id', uc.getDogs)
app.put('/api/updateOwner/:id', uc.updateOwner)
app.get('/api/getOwner/:id', uc.getOwner)
app.get('/api/getProviderProfile/:id', uc.getProviderProfile)
app.put('/api/updateProviderProfile/:id', uc.updateProviderProfile)
app.delete('/api/deleteDog/:id', uc.deleteDog)
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
    let { room, msg, user, user_id, provider_id , author_id} = data
    const db = app.get('db')
    user_id = parseInt(user_id)
    provider_id = parseInt(provider_id)
    author_id = parseInt(author_id)
    await db.chat.create_message({ room:room, message:msg, user_name:user, author_id:author_id, user_id:user_id, provider_id:provider_id })
    let messages = await db.chat.get_message_history({ room: room })
    io.to(data.room).emit('sendMsg', messages)
    console.log(messages)
  })

  socket.on("videoRoom", function(roomNumber){
    console.log('videoRoom', roomNumber)
    socket.join(roomNumber)
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  })

  socket.on('callPeer', function(data){
    // console.log('hit callPeer', data)
    io.to(data.room).emit('callPeer', data)
  })

  socket.on('answerPeer', function(data){
    // console.log('hit answerPeer', data)
    io.to(data.room).emit('answerPeer', data)
  })

  socket.on('reloadHeader', function(data){
    console.log('hit reload', data)
    io.to(data).emit('reloadHeader', data)
  })
  

})
