const http = require('http');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela',
  'The way to get started is to quit talking and begin doing. -Walt Disney',
  'Your time is limited, so don\'t waste it living someone else\'s life. Don\'t be trapped by dogma – which is living with the results of other people\'s thinking. -Steve Jobs',
  'If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt',
  'If you look at what you have in life, you\'ll always have more. If you look at what you don\'t have in life, you\'ll never have enough. -Oprah Winfrey',
  'If you set your goals ridiculously high and it\'s a failure, you will fail above everyone else\'s success. -James Cameron',
  'Life is what happens when you\'re busy making other plans. -John Lennon'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // collect any additional data coming in.
  let body = [];
  // incase there is an error
  req.on('error', (err) => {
    console.error('It seems an error has occured', err);
  }).on('data', (chunk) => {
    // incase there is any data streaming in, collect it.
    body.push(chunk);
  }).on('end', () => {
    // once the stream ends. put the chuncks together and make it readable.
    body = Buffer.concat(body).toString();

    // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
    if (req.url == '/') {
      console.log('redirecting');
      res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
      res.end();
    }

    // TODO: GET ONE
    if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
      console.log('Processing a Get Request!');
      res.writeHead(200, headers);
      res.write(quotes[getRandomInt(0, quotes.length)])
      res.end();

    }
    // TODO: POST/CREATE
    else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
      console.log('Processing a Post Request!');
      //YOUR CODE HERE
      res.end();
    }

    //CATCH ALL ROUTE
    else {
      res.writeHead(404, headers);
      res.end('Page not found');
    }
  });
};

  const server = http.createServer(handleRequest);
  server.listen(port);

  console.log('Server is running in the terminal!');
  console.log(`Listening on http://localhost:${port}`);
