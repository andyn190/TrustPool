const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const setupRouters = require('./routers');
const { PUBLIC_PATH } = require('./config');

const app = express();
const server = http.Server(app);
app.use(cors());
app.use(bodyParser.json());

setupRouters(app);

app.use(express.static(PUBLIC_PATH));
module.exports.server = server;