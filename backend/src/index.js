const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const Routes = require('./routes');

require('dotenv').config();

const { HTTP_PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(Routes);

app.get('/', (req, res) => {
    res.json({message:"Working"})
});

app.listen(HTTP_PORT, () => {
    console.log(`Working on ${HTTP_PORT}`)
});