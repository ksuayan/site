import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = { pages: [] };

  componentDidMount() {
    fetch("/api/page")
      .then(res => res.json())
      .then(data => this.setState({ pages: data }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Demo</h1>
        </header>
        <p className="App-intro">
          {this.state.pages.map(entry => <div>{entry.title}</div>)}
        </p>
      </div>
    );
  }
}

export default App;
