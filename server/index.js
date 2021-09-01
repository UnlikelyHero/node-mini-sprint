const express = require('express');
const cors = require('cors');
const model = require('./model.js');
const app = express();
const port = 3000

// temporary quotes storage.
const quotes = [
  'this is a locally stored server quote - dv'
];

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

//random index function (thanks hoisting!)
function getRandomInt(min, max) {
  // min should be 0 and max should be array length - 1
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  //The maximum is exclusive and the minimum is inclusive
}

app.use(cors());
app.use(express.text());
app.use(express.static('../react-client/dist/'));

app.all('/', function(req, res) {
  res.redirect(307, '/quote');
  // status-code 307 preserves the original method and body on the redirect
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307
})

app.get('/quote', (req, res) => {
  // this replaces the "get one' function from node http server.
  model.getRandomQuote((err, data) => {
    if (err) {
      res.status(400).set(headers).send(err);
    } else {
      res.status(200).set(headers).send(data);
    }
  });
});

app.post('/quote', (req, res) => {
  model.postQuote(req.body, (err, data) => {
    if (err) {
      res.status(400).set(headers).send(err);
    } else {
      console.log('Let\'s get the id!', data)
      model.getQuoteById(data, (err, data) => {
        if (err) {
          res.status(400).set(headers).send(err);
        } else {
          res.status(200).set(headers).send(data);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})