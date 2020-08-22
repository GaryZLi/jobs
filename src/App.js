import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
  },
  line: {
    display: 'flex',
    borderBottom: 'black 1px solid',
  },
  cell: {
    height: 45,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
  }
});

function App() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const width = Math.floor(window.innerWidth / 7);

  const formatter = data => (data.split(';'));

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("update", datax => {
      if (datax.trim('\n')) {
        setData(prev => [
          ...prev,
          datax,
        ]);
      }
    });
  }, []);

  return (
    <div className={classes.root} style={{overflowY: 'auto'}}>
      <div className={classes.line}>
        <div className={classes.cell} style={{ borderRight: 'black 1px solid', width: 40}}>
          #
        </div>
        <div className={classes.cell} style={{ borderRight: 'black 1px solid', width }}>
          COMPANY
        </div>
        <div className={classes.cell} style={{ borderRight: 'black 1px solid', width }}>
          POSITION
        </div>
        <div className={classes.cell} style={{ borderRight: 'black 1px solid', width }}>
          LOCATION
        </div>
        <div className={classes.cell} style={{ borderRight: 'black 1px solid', width }}>
          DATE APPLIED
        </div>
        <div className={classes.cell} style={{flex: 1}}>
          LINK
        </div>
      </div>
      {data.map((item, id) => {
        const cell = formatter(item);
        
        return (
          <div key={id} className={classes.line}>
            <div className={classes.cell} style={{ borderRight: 'black 1px solid', width: 40 }}>
              {id + 1}
            </div>
            <div className={classes.cell} style={{ borderRight: 'black 1px solid', width }}>
              {cell[0]}
            </div>
            <div className={classes.cell} style={{ borderRight: 'black 1px solid', width }}>
              {cell[1]}
            </div>
            <div className={classes.cell} style={{ borderRight: 'black 1px solid', width }}>
              {cell[2]}
            </div>
            <div className={classes.cell} style={{ borderRight: 'black 1px solid', width }}>
              {cell[3]}
            </div>
            <a className={classes.cell} style={{flex: 1, color: '#007acc', overflow: 'hidden'}} href={cell[4]}>
              {cell[4]}
            </a>
          </div>
        )
      })}
    </div>
  );
}

export default App;