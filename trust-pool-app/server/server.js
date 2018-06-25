const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);
app.use(cors());
app.use(bodyParser.json());


module.exports.server = server;