import { Box, Container, Snackbar } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { getLeagueStatusEnums, getPlayerStatusEnums, getPlayerTypeEnums } from '../funcs/get-player-enum';

import Alert from '@material-ui/lab/Alert';
import CustomTable from '../components/table/custom-table';
import { Helmet } from 'react-helmet';
import PlayerView from './player-view';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

const columns = [
  { title: 'BHQ ID', field: 'bhqId', type: 'numeric', width: 75 },
  { title: 'First Name', field: 'firstName' },
  { title: 'Last Name', field: 'lastName' },
  { title: 'Age', field: 'age', type: 'numeric', width: 75 },
  { title: 'Type', field: 'type', lookup: [] },
  { title: 'Position(s)', field: 'positions' },
  { title: 'Team', field: 'team', width: 75 },
  { title: 'Status', field: 'status', lookup: [] },
  { title: 'League #1 Status', field: 'league1', lookup: [] },
  { title: 'League #2 Status', field: 'league2', lookup: [] },
  { title: 'Draft Rank', field: 'draftRank', type: 'numeric' },
  { title: 'Drafted %', field: 'draftedPercentage', type: 'numeric', format: (value) => value.toFixed(2) }
];

const updateLookup = (field, lookup) => columns.filter((column) => column.field === field).forEach((column) => column.lookup = lookup);

const useStyles = makeStyles((theme) => ({ 
  box: { backgroundColor: 'background.default', paddingBottom: theme.spacing(3), paddingTop: theme.spacing(3) }
}));

export default () => {
  const classes = useStyles();
  const isMountedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [leagusStatuses, setLeagueStatuses] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerStatuses, setPlayerStatuses] = useState([]);
  const [playerTypes, setPlayerTypes] = useState([])
  const [severity, setSeverity] = useState('');
  
  useEffect(() => { 
    isMountedRef.current = true;
    getLeagueStatusEnums((response) => { 
      setLeagueStatuses(response);
      updateLookup('league1', response);
      updateLookup('league2', response);
    });
    getPlayerStatusEnums((response) => {
      setPlayerStatuses(response);
      updateLookup('status', response);
    });
    getPlayerTypeEnums((response) => {
      setPlayerTypes(response);
      updateLookup('type', response);
    });
    getPlayers();
    return () => { isMountedRef.current = false; };
  }, []);

  const buildEdit = (handleEditClose, editOpen, editRow) => {
    const enums = { leagusStatuses: leagusStatuses, playerStatuses: playerStatuses, playerTypes: playerTypes }; 
    return (<PlayerView enums={enums} onClose={handleEditClose} open={editOpen} player={editRow}/>);
  };

  const getPlayers = () => {
    axios
    .get('http://baseball-player-api.schultz.local/api/player')
    .then(response => { 
      if (isMountedRef.current) {
        setPlayers(response.data.players); 
        setIsLoading(false); 
      }
    })
    .catch(() => { 
      setSeverity('error');
      setMessage('Unable to load players');
      setOpen(true); 
      setIsLoading(false);
    });
  };

  const onRowUpdate = (newData) => {
    if (!newData) return;
    updatePlayer(newData.id, newData);
    const dataUpdate = players.map(p => p.id === newData.id ? newData : p);
    setPlayers([...dataUpdate]);
    return dataUpdate;
  };

  const updatePlayer = (id, player) => {
    axios
      .put(`http://baseball-player-api.schultz.local/api/player/${id}`, player)
      .then(() => {
        setSeverity('success');
        setMessage('Successfully updated player');
        setOpen(true); 
      })
      .catch(() => {
        setSeverity('error');
        setMessage('Unable to update player');
        setOpen(true); 
      });
  };
    
  return (
    <>
      <Helmet>
        <title>Players | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Box className={classes.box}>
        <Container maxWidth={false}>
          {isLoading 
            ? <Typography align='left' color='textPrimary' variant='h4'>Loading Players...</Typography>
            : <CustomTable buildEdit={buildEdit} columns={columns} handleClose={onRowUpdate} values={players}/>}
        </Container>
      </Box>
      <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} autoHideDuration={2000} onClose={() => setOpen(false)} open={open}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}