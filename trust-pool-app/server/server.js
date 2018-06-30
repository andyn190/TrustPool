const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const db = require(path.join('${__dirname}', './../../database'));

const setupRouters = require('./routers');
const { setupPassport } = require('./passport');
const authenticated = require('./passport/authenticated');
const { PUBLIC_PATH } = require('./config');

const app = express();
const server = http.Server(app);
app.use(cors());
app.use(require('cookie-parser')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setupPassport(app);
setupRouters(app);
// app.use(authenticated);
app.use(express.static(PUBLIC_PATH));
module.exports.server = server;
