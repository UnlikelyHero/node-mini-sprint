const mysql = require('mysql');
const config = require(./config.js);

module.exports = {
  // query to make request to mysql.
  query: (queryString, queryParams, callback) => {
    var dbAccess = mysql.createConnection({
      host: '127.0.0.1',
      user: 'hr-atx',
      password: config.DB_PASS,
      database: 'quotesdb'
    });
    dbAccess.connect();

    console.log('Database Connected!'); // <<< TEST

    dbAccess.query(queryString, queryParams, (err, data) => {
      if (err) {
        callback(err);
      } else {
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

    console.log('Closing Database'); // <<< TEST
    dbAccess.end();
  }
}