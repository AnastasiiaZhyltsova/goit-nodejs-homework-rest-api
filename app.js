const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// змінні оточення
dotenv.config();



const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');

const { DB_HOST } = process.env;
// console.log(DB_HOST);

mongoose.connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });



const app = express();


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message })
})

module.exports = app;
