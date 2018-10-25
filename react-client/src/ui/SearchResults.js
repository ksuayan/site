import React, { Component } from 'react';
import PaperSearchItem from './PaperSearchItem';

class SearchResults extends Component {
  render() {
    return (
        <div className={this.props.className} onClick={this.props.onClick}>
          {this.props.results.map(
            entry => <PaperSearchItem key={entry._id}
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