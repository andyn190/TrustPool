const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.Server(app);
app.use(cors());

module.exports.server = server;