import React, { Component } from 'react';
import kanye from './assets/img/kanye.jpg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      quote: ''
    }
  }

  fetchQuote = () => {
      fetch("https://api.kanye.rest")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              quote: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            })
          }
        )
    }

  componentDidMount() {
    this.fetchQuote();
  }

  render() {
    const { error, isLoaded, quote } = this.state;

    let content;

    if (error) {
      content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
      content = <p>Loading...</p>
    } else {
      content = <p>{quote.quote}</p>
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={kanye} className="App-logo" alt="logo" />
          {content}
          {quote.quote && (<p>- Kanye West</p>)}
          <button className="button" onClick={this.fetchQuote}>refresh</button>
        </header>
        <footer className="footer">
          <p>JT 2019, Data from <a className="App-link" href="https://kanye.rest/">kanye.rest</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
