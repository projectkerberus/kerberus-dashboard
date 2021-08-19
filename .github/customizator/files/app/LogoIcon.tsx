import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 28,
  },
  polygon: {
    fill: '#fff',
  },
  path: {
    fill: '#fff',
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192 166.88"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <polygon className={classes.polygon} points="128.98 50.2 128.98 0 109.26 19.39 109.26 50.2 172.28 99.09 148.81 117.99 168.53 117.99 192 99.09 128.98 50.2"/>
          <polygon className={classes.polygon} points="0 88.66 0 166.88 59.32 166.88 62.98 136.41 10.43 78.4 0 88.66"/>
          <polygon className={classes.polygon} points="90.18 50.2 90.18 0 27.04 62.07 77.7 117.99 84.27 117.99 78.41 166.88 98.13 166.88 104 117.99 129.73 117.99 153.19 99.09 90.18 50.2"/>
          <polygon className={classes.polygon} points="20.1 64.2 17.5 61.33 10 68.13 12.6 71 69.59 133.92 71.9 136.47 79.41 129.67 77.1 127.12 20.1 64.2"/>
        </g>
      </g>
    </svg>
  );
};

export default LogoIcon;