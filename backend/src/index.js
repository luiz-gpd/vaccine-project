const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const mongoose = require('mongoose');
const Routes = require('./routes');

require('dotenv').config();

const { MONGO_URL ,HTTP_PORT } = process.env;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.use(Routes);

app.get('/', (req, res) => {
    res.json({message:"Working"})
});

app.listen(HTTP_PORT, () => {
    console.log(`Working on ${HTTP_PORT}`)
});