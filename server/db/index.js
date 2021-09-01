const mysql = require('mysql');
const config = require('./config.js');

module.exports = {
  // query to make request to mysql.
  dbquery: (queryString, callback) => {
    var dbAccess = mysql.createConnection({
      host: '127.0.0.1',
      user: 'hr-atx',
      password: config.DB_PASS,
      database: 'quotesdb'
    });
    dbAccess.connect();

    dbAccess.query(queryString, null, (err, data) => {
      if (err) {
        console.log('a db error occured', err);
        callback(err);
      } else {
        console.log('query successful');
        // select queries will return an array
        if (Array.isArray(data)) {
          Promise.all(data)
            .then((results) => {
              callback(null, results);
            });
        } else {
          // insert queries seem to return an object with info.
          callback(null, data);
        }
      }
    });

    dbAccess.end();
  }
}