const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require("dotenv").config();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error.js');

const authRoutes = require('./routes/authRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  })

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/', authRoutes);
app.use('/', userRoutes);

app.use(errorHandler);

const port = process.env.PORT || 8080

app.listen(8080, () => {

    console.log("Server listening to port 8080")
})