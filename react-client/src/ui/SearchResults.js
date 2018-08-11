import React, { Component } from 'react';
import SearchItem from './SearchItem';

class SearchResults extends Component {
  render() {
    return (
        <div className={this.props.className} onClick={this.props.onClick}>
          {this.props.results.map(
            entry => <SearchItem key={entry._id}
              name={entry.Name}
              artist={entry.Artist}
              album={entry.Album}
            />
          )}
        </div>
    );
  }
}

export default SearchResults;