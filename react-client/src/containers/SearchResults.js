import SearchResults from '../ui/SearchResults';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
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

console.log("Container created for SearchResults", Container);

export default Container;