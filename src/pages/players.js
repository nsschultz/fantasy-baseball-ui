import { Box, Container, Snackbar } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { getLeagueStatusEnums, getPlayerStatusEnums, getPlayerTypeEnums } from '../funcs/get-player-enum';

import Alert from '@material-ui/lab/Alert';
import CustomTable from '../components/table/custom-table';
import { Helmet } from 'react-helmet';
import PlayerView from './player-view';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export default () => {
  const isMountedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [leagusStatuses, setLeagueStatuses] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerStatuses, setPlayerStatuses] = useState([]);
  const [playerTypes, setPlayerTypes] = useState([])
  const [severity, setSeverity] = useState('');

  const columns = [
    { title: 'BHQ ID', field: 'bhqId', type: 'numeric' },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Age', field: 'age', type: 'numeric' },
    { title: 'Type', field: 'type', lookup: playerTypes },
    { title: 'Position(s)', field: 'positions' },
    { title: 'Team', field: 'team' },
    { title: 'Status', field: 'status', lookup: playerStatuses },
    { title: 'League #1 Status', field: 'league1', lookup: leagusStatuses },
    { title: 'League #2 Status', field: 'league2', lookup: leagusStatuses },
    { title: 'Draft Rank', field: 'draftRank', type: 'numeric' },
    { title: 'Drafted %', field: 'draftedPercentage', type: 'numeric', format: (value) => value.toFixed(2) }
  ];
  
  useEffect(() => { 
    isMountedRef.current = true;
    getLeagueStatusEnums((response) => setLeagueStatuses(response));
    getPlayerStatusEnums((response) => setPlayerStatuses(response));
    getPlayerTypeEnums((response) => setPlayerTypes(response));
    getPlayers();
    return () => { isMountedRef.current = false; };
  }, []);

  const buildEdit = (handleEditClose, editOpen, editRow) => {
    const enums = { leagusStatuses: leagusStatuses, playerStatuses: playerStatuses, playerTypes: playerTypes }; 
    return (<PlayerView onClose={handleEditClose} open={editOpen} player={editRow} enums={enums}/>);
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