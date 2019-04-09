const path = require('path');
require('dotenv').config()
const express = require ('express')
const session = require ('express-session')
const massive = require ('massive')
const pg = require ('pg')
const pgSession = require('connect-pg-simple')(session)

const ac = require('./controllers/auth_controller')
const uc = require('./controllers/user_controller')

const app = express()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

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
    app.listen(SERVER_PORT, () => console.log('Sweeettt'))
})

//Auth_controller
app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.post('/auth/logout', ac.logout)

app.get('/api/current', ac.getUser)

//user_controller

app.get('/api/getMyProviders/:id', uc.getMyProviders)
// app.get('/api/provider/:id', uc.provider)