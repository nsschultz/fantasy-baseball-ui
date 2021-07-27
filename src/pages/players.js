import { Box, Container, Snackbar } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import CustomTable from '../components/table/custom-table';
import { Helmet } from 'react-helmet';
import PlayerView from './player-view';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const columns = [
  { title: 'BHQ ID', field: 'bhqId', type: 'numeric' },
  { title: 'First Name', field: 'firstName' },
  { title: 'Last Name', field: 'lastName' },
  { title: 'Age', field: 'age', type: 'numeric' },
  { title: 'Type', field: 'type', lookup: { 0: '', 1: 'Batter', 2: 'Pitcher' }, type: 'numeric' },
  { title: 'Position(s)', field: 'positions' },
  { title: 'Team', field: 'team' },
  { title: 'Status', field: 'status', lookup: { 0: '', 1: 'Disabled List', 2: 'Not Available', 3: 'New Entry' }},
  { title: 'League #1 Status', field: 'league1', lookup: { 0: 'Available', 1: 'Rostered', 2: 'Unavailable', 3: 'Scouted' }},
  { title: 'League #2 Status', field: 'league2', lookup: { 0: 'Available', 1: 'Rostered', 2: 'Unavailable', 3: 'Scouted' }},
  { title: 'Draft Rank', field: 'draftRank', type: 'numeric' },
  { title: 'Drafted %', field: 'draftedPercentage', type: 'numeric', format: (value) => value.toFixed(2) }
];

const convertToNumber = (val) => { return parseInt(val, 10); };

const fixPlayer = player => {
  player.type = convertToNumber(player.type);
  player.status = convertToNumber(player.status);
  player.league1 = convertToNumber(player.league1);
  player.league2 = convertToNumber(player.league2);
  return player;
};

export default () => {
  const isMountedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [severity, setSeverity] = useState('');
  
  useEffect(() => { 
    isMountedRef.current = true;
    getPlayers();
    return () => { isMountedRef.current = false; };
  }, []);

  const buildEdit = (handleEditClose, editOpen, editRow) => (<PlayerView onClose={handleEditClose} open={editOpen} player={editRow}/>);

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
  }

  const onRowUpdate = (newData) => {
    if (!newData) return;
    const fixedPlayer = fixPlayer(newData);
    updatePlayer(newData.id, fixedPlayer);
    const dataUpdate = [...players];
    dataUpdate[newData.id] = fixedPlayer;
    setPlayers([...dataUpdate]);
    return players;
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
      <Box sx={{ backgroundColor: 'background.default', py: 3 }}>
        <Container maxWidth={false}>
          {isLoading 
            ? <Typography align='left' color='textPrimary' variant='h4'>Loading Players...</Typography>
            : <CustomTable columns={columns} values={players} buildEdit={buildEdit} handleClose={onRowUpdate}/>}
        </Container>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}