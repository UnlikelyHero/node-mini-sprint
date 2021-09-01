const {dbquery} = require('./db/index.js');

module.exports = {

  getRandomQuote: (callback) => {
    var queryString = 'SELECT quote from quotes ORDER BY RAND() LIMIT 1;'
    dbquery(queryString, (err, data) => {
      if (err) {
        callback('Failed to retrieve quotes: ' + err);
      } else {
        // this.getRandomInt(0, data.length)
        var quote = data[0].quote;
        callback(null, quote);
      }
    });
  },

  getIdByQuote: (quote, callback) => {
    console.log('>> getIdByQuote:', quote);
    var queryString = `SELECT quote FROM quotes WHERE quote="${quote}"`;
    dbquery(queryString, (err, data) => {
      if (err) {
        callback('Failed to retrieve quote by string' + err);
      } else {
        if (data.length === 0) {
          callback('No matches found');
        } else {
          callback(null, data[0].quote)
        }
      }
    });
  },

  getQuoteById: (quoteID, callback) => {
    console.log('>> getQuoteById:', quoteID)
    var queryString = `SELECT quote FROM quotes WHERE id="${quoteID}"`;
    dbquery(queryString, (err, data) => {
      if (err) {
        callback('Failed to retrieve quote by id' + err);
      } else {
        if (data.length === 0) {
          callback('No quotes were found with the id: ' + quoteID);
        } else {
          callback(null, data[0].quote)
        }
      }
    });
  },

  postQuote: (quoteString, callback) => {
    console.log('>> postQuote:', quoteString);
    var queryString = `INSERT INTO quotes (quote) VALUES ('${quoteString}')`;
    dbquery(queryString, (err, data) => {
      if (err) {
        callback('Failed to post quote: ' + err);
      } else {
        callback(null, data.insertId)
      };
    });
  },

  updateQuote: (quoteid, callback) => {
    console.log('You updated a quote');
  },

  removeQuote: (quoteid, callback) => {
    console.log('You removed a quote');
  }


}