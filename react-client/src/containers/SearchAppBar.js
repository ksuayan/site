import SearchAppBar from '../ui/SearchAppBar';
import { connect } from 'react-redux';
import {setTerm,setResults} from '../actions';

const mapStateToProps = (state) => {
  console.log("searchappbar.mapStateToProps: ", state);  
  return {
    term: state.term
  }
}

const API_PATH = "/search";

const mapDispatchToProps = dispatch => {
  return {
    init: (event) => {
      fetch(API_PATH)
      .then(res => res.json())
      .then(data => {
        dispatch(setResults(data.result));
      });
    },
    handleChange: (event) => {
      let url = API_PATH;
      let inputValue= event.target.value;
      if (inputValue.length>3) {
        url = API_PATH + "/" + inputValue
      }
      console.log("searchfield.handleChange", inputValue);
      dispatch(setTerm(inputValue));  
      fetch(url)
        .then(res => res.json())
        .then(data => {
          dispatch(setResults(data.result));
        });
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(SearchAppBar);

console.log("Container created: SearchAppBar");

export default Container;