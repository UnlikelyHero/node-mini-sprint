// endpoint URL
const endpoint = 'http://127.0.0.1:3000/quote';

$(document).ready(function() {

  // get a quote from the server when the page loads and add it to the dom
  getQuote();

  // when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  function getQuote() {
    //YOUR CODE HERE, Add a GET request
    $.ajax({
      url: endpoint,
      method: 'GET',
      success: (data, code) => {
        console.log('Request to get data successful!');
        // add the data to the DOM
        $('#response').html(data);
      },
      error: (error, code) => {
        console.log('Unable to get quote.');
      },
    });

  }

  function addQuote(quote){
    //YOUR CODE HERE, Add a POST request
    $.ajax({
      url: endpoint,
      method: 'POST',
      data: quote,
      success: (data, code) => {
        console.log('Request to add quote successful!')
        // clear the value from the input field
        $('input').val('');
        // update the response quote to acknowledge the req
        $('#response').html(data);
      },
      error: (err, code) => {
        alert('Unable to add quote.');
      },
    });
  }

});
