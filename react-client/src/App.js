import React, { Component } from "react";
import "./App.css";

class App extends Component {

  state = { 
    term: '',
    pages: [] 
  };

  constructor(props) {
    super(props);
    this.termInput = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    fetch("/search")
      .then(res => res.json())
      .then(data => {
        this.setState({
          term: '',
          pages: data.result
        })
      });
  }

  handleInputChange() {
    let url = "/search";
    if (this.termInput.value.length>3) {
      url = "/search/" + this.termInput.value
    }
    console.log("state", this.state);
    console.log("url:", url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          term: this.termInput.value,
          pages: data.result 
        })
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Search Demo</h1>
        </header>
        <div className="App-intro">
          <form>
            <input className="search-bar" 
              placeholder="Search for ..."
              ref={input => this.termInput = input}
              onChange={this.handleInputChange}
              />
          </form>
          
          {this.state.pages.map(
            entry => <p key={entry._id}>
              {entry.Name}<br/> 
              {entry.Artist}<br/> 
              {entry.Album}
              </p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
