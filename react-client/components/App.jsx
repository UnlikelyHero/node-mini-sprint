import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      showSaved: false
    }
  }

  render() {
    return (
    <div>
      <h1>Random Quote Generator</h1>
      <h2 id="quote">quote goes here</h2>
      <form>
        <input type="text" />
        <button id="submit">Submit</button>
        <p id="response">confirmation that the quote was saved goes here.</p>
      </form>
    </div>
    );
  };
};