import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box p={2}>
      <LinearProgress color="secondary" />
      <span>Загрузка...</span>
      </Box>
    </div>
  );
}