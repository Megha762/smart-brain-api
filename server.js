const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
var knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

//console.log(db.select('*').from('users').then(console.log));

const app = express()

app.use(bodyParser.json());
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: "Suzi",
      email: "suzi@gmail.com",
      password: "suzi123",
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: "Moni",
      email: "moni@gmail.com",
      password: "moni123",
      entries: 0,
      joined: new Date()
    },
  ]
}

app.get("/", (req, res) => {
  res.send('it is working')
})

app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt))

app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))

app.put("/image", (req, res) => image.handleImage(req, res, db))

app.listen((3000 || process.env.PORT), () => {
  console.log(`App is running on port ${process.env.PORT}`)
})