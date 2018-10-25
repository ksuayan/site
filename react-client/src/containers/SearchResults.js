import SearchResults from '../ui/SearchResults';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  console.log("searchResults.mapStateToProps: ", state);  
  return {
    results: state.results  
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (event) => {
      console.log("clicked!");
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(SearchResults);

console.log("Container created: SearchResults");

export default Container;