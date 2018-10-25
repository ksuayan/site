import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class SearchField extends React.Component {
  state = {
    term: 'beatles'
  };

  componentDidMount() {
    console.log("searchField.componentDidMount: ", this.props);
    this.props.init();
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          onChange={this.props.handleChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
      </form>
    );
  }
}

SearchField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchField);