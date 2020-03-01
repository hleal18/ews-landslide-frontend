import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    // '& > span': {
    //   margin: theme.spacing(2),
    // },
  },
}));

export default function AddButton({ handleClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Icon color="primary" style={{fontSize: 50 }}>add_circle</Icon> */}
      <IconButton color="primary" onClick={handleClick}>
          <AddCircleIcon style={{ fontSize: 100 }}/>
      </IconButton>
    </div>
  );
}