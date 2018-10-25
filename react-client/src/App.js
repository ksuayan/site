import React, { Component } from "react";
import SearchAppBar from "./containers/SearchAppBar";
import SearchResults from "./containers/SearchResults";
import "./App.css";

class App extends Component {

  state = { 
    term: '',
    results: [] 
  };

  render() {
    return (
      <div className="App">
        <SearchAppBar/>
        <div className="App-intro">
          <SearchResults results={this.state.results}/>
        </div>
      </div>
    );
  }
}

export default App;
