import { Box, Container, Snackbar } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { getLeagueStatusEnums, getPlayerStatusEnums, getPlayerTypeEnums } from '../funcs/get-player-enum';

import Alert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';
import ParentTable from '../components/table/parent-table';
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

const columnsBattingStats = [
  { title: '', field: 'type' },
  { title: 'AB', field: 'atBats', type: 'numeric' },
  { title: 'R', field: 'runs', type: 'numeric' },
  { title: 'H', field: 'hits', type: 'numeric' },
  { title: '2B', field: 'doubles', type: 'numeric' },
  { title: '3B', field: 'triples', type: 'numeric' },
  { title: 'HR', field: 'homeRuns', type: 'numeric' },
  { title: 'RBI', field: 'runsBattedIn', type: 'numeric' },
  { title: 'BB', field: 'baseOnBalls', type: 'numeric' },
  { title: 'K', field: 'strikeOuts', type: 'numeric' },
  { title: 'SB', field: 'stolenBases', type: 'numeric' },
  { title: 'CS', field: 'caughtStealing', type: 'numeric' },
  { title: 'TB', field: 'totalBases', type: 'numeric' },
  { title: 'BA', field: 'battingAverage', type: 'numeric', format: (value) => value.toFixed(3) },
  { title: 'OB', field: 'onBasePercentage', type: 'numeric', format: (value) => value.toFixed(3) },
  { title: 'SLG', field: 'sluggingPercentage', type: 'numeric', format: (value) => value.toFixed(3) },
  { title: 'OPS', field: 'onBasePlusSlugging', type: 'numeric', format: (value) => value.toFixed(3) },
  { title: 'CT%', field: 'contractRate', type: 'numeric', format: (value) => value.toFixed(2) },
  { title: 'PX', field: 'power', type: 'numeric', format: (value) => value.toFixed(0) },
  { title: 'BB%', field: 'walkRate', type: 'numeric', format: (value) => value.toFixed(2) },
  { title: 'SPD', field: 'speed', type: 'numeric', format: (value) => value.toFixed(0) },
  { title: 'BPV', field: 'basePerformanceValue', type: 'numeric', format: (value) => value.toFixed(0) }
];

const columnsPitchingStats = [
  { title: '', field: 'type' },
  { title: 'W', field: 'wins', type: 'numeric' },
  { title: 'L', field: 'losses', type: 'numeric' },
  { title: 'QS', field: 'qualityStarts', type: 'numeric' },
  { title: 'SV', field: 'blownSaves', type: 'numeric' },
  { title: 'IP', field: 'inningsPitched', type: 'numeric', format: (value) => value.toFixed(1) },
  { title: 'HA', field: 'hitsAllowed', type: 'numeric' },
  { title: 'ER', field: 'earnedRuns', type: 'numeric' },
  { title: 'HRA', field: 'homeRunsAllowed', type: 'numeric' },
  { title: 'BBA', field: 'baseOnBallsAllowed', type: 'numeric' },
  { title: 'K', field: 'strikeOuts', type: 'numeric' },
  { title: 'FB%', field: 'flyBallRate', type: 'numeric', format: (value) => value.toFixed(2) },
  { title: 'GB%', field: 'groundBallRate', type: 'numeric', format: (value) => value.toFixed(2) },
  { title: 'ERA', field: 'earnedRunAverage', type: 'numeric', format: (value) => value.toFixed(2) },
  { title: 'BABIP', field: 'battingAverageOnBallsInPlay', type: 'numeric', format: (value) => value.toFixed(3) },
  { title: 'SR', field: 'strandRate', type: 'numeric' },
  { title: 'CMD', field: 'command', type: 'numeric', format: (value) => value.toFixed(2) },
  { title: 'DOM', field: 'dominance', type: 'numeric', format: (value) => value.toFixed(2) },
  { title: 'CON', field: 'control', type: 'numeric', format: (value) => value.toFixed(2) },
  { title: 'GB/FB', field: 'groundBallToFlyBallRate', type: 'numeric' },
  { title: 'BPV', field: 'basePerformanceValue', type: 'numeric', format: (value) => value.toFixed(0)}
];

const statsDisplays = { 
  YTD: 'Year to Date', 
  PROJ: 'Projected', 
  CMBD: 'Combined'
};

const statsSelectors = [ 'YTD', 'PROJ', 'CMBD' ];

const getChildRows = (player) => getDisplayStats(player.type == 1 ? player.battingStats : player.pitchingStats);

const getDisplayStats = (stats) => {
  return statsSelectors.map(s => {
    var ds = stats[s];
    ds.type = statsDisplays[s];
    return ds;
  });
};

const statsSelection = (player) => player.type == 1 ? columnsBattingStats : columnsPitchingStats;

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
        setPlayers(response.data); 
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
            : <ParentTable 
                buildEdit={buildEdit} 
                childColumnSelector={statsSelection} 
                childRowSelector={getChildRows}
                childTitle='Season Stats' 
                columns={columns} 
                handleClose={onRowUpdate} 
                values={players}/>}
        </Container>
      </Box>
      <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} autoHideDuration={2000} onClose={() => setOpen(false)} open={open}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}