import React, { Component } from "react";
import '../stylesheets/search-results.css';

class SearchItem extends Component {
  render() {
    return (
        <div className='search-result'>
          {this.props.name}<br/>
          {this.props.artist}<br/>
          {this.props.album}
        </div>
    );
  }
}

export default SearchItem;