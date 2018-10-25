import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});


class PaperSearchItem extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1} square={true}>
        <Typography variant="h5" component="h3">
          {this.props.name}
        </Typography>
        <Typography component="p">
          {this.props.artist}
        </Typography>
        <Typography component="p">
          {this.props.album}
        </Typography>
      </Paper>
    );
  }
}

PaperSearchItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSearchItem);
