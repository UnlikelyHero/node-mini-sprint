$(document).ready(function() {

  // get a quote from the server when the page loads and add it to the dom
  getQuote();

  // when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  // endpoint URL
  const endpoint = 'http://12.0.0.1:3000/quote';

  function getQuote() {
    //YOUR CODE HERE, Add a GET request
    $.ajax({
      url: endpoint,
      method: 'GET',
      success: (data, code) => {
        console.log('Request to add code successful:', code);
        // add the data to the DOM
        $('#response').html(`Here's you're data!: ${data}`);
      },
      error: (err, code) => {
        alert('Unable to get quote. Status Code:', code, err);
      },
      contentType: 'application/JSON; charset=UTF-8'
    });

  }

  function addQuote(quote){
    //YOUR CODE HERE, Add a POST request
    $.ajax({
      url: endpoint,
      method: 'POST',
      data: {},
      success: (data,code) => {
        console.log('Request to add code successful:', code)

      },
      error: (err, code) => {
        alert('Unable to add quote. Status Code:', code, err);
      },
      contentType: 'application/JSON; charset=UTF-8'
    });
  }

});
