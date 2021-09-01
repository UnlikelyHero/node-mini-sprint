import React from 'react';
import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:3000'
});

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: 'Hey there, nice default react quote! - Don Vida',
      quoteInputValue: '',
      lastSavedValue: '',
      showSaved: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    server.get('/quote').then(res => {
      this.setState({
        quote: res.data
      })
    });
  };

  componentDidUpdate() {
  }

  handleChange(event) {
    this.setState({
      quoteInputValue: event.target.value,
    })
  };

  handleSubmit(event) {
    var quote = this.state.quoteInputValue;
    var lastValue = this.state.quoteInputValue

    server.post('/quote', quote, {
      'headers': {
        'content-type': 'text/plain'
      }
    }).then(res => {
      this.setState({
        quote: res.data,
        quoteInputValue: '',
        lastSavedValue: lastValue
      })
    });

    this.setState({
      showSaved: true,
    });

    setTimeout(() => {
      this.setState({
        showSaved: false
      });
    }, 10000);
  };



  render() {
    var style = {
      display: this.state.showSaved ? 'block' : 'none'
    }

    return (
    <div>
      <h1>Random Quote Generator</h1>
      <h2 id="quote">{this.state.quote}</h2>
      <div id="form">
        <input type="text" onChange={this.handleChange} value={this.state.value}/>
        <button id="submit" onClick={this.handleSubmit}>Submit</button>
        <p style={style} id="response">Saved Quote: {this.state.lastSavedValue}</p>
      </div>
    </div>
    );
  };
};