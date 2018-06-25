const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => {
  res.status(200).send({ message: 'this worked' });
});

app.listen(3000, () => {
  console.log('this worked');
});