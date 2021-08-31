const express = require('express');
const app = express();
const port = 3000

// storage of strings with favorite quotes
const quotes = [
  'The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela',
  'The way to get started is to quit talking and begin doing. - Walt Disney',
  'Your time is limited, so don\'t waste it living someone else\'s life. Don\'t be trapped by dogma – which is living with the results of other people\'s thinking. - Steve Jobs',
  'If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt',
  'If you look at what you have in life, you\'ll always have more. If you look at what you don\'t have in life, you\'ll never have enough. - Oprah Winfrey',
  'If you set your goals ridiculously high and it\'s a failure, you will fail above everyone else\'s success. - James Cameron',
  'Life is what happens when you\'re busy making other plans. - John Lennon'
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

app.use(express.text());
app.use(express.static('../react-client/dist/'));

// app.all('/', function(req, res) {
//   res.redirect(307, '/quote');
//   // status-code 307 preserves the original method and body on the redirect
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307
// })

app.get('/quote', (req, res) => {
  // this replaces the "get one' function from node http server.
  console.log('made a get req from /quote');
  res.status(200).set(headers).send(quotes[getRandomInt(0, quotes.length)]);
});

app.post('/quote', (req, res) => {
  console.log('made a post req from /quote');
  quotes.push(req.body);
  res.status(200).set(headers).send(quotes[quotes.length - 1]);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})