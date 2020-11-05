import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  imageHome: {
    maxWidth: "400px"
  }
}));


function Home() {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" justifyContent="center">
          <CardMedia
            className={classes.imageHome}
            component="img"
            image='./home.png'
          />
      </Box>
    </>
  )
}

export default Home;