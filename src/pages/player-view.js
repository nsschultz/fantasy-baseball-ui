import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import CustomCard from '../components/card/custom-card';
import CustomTextField from '../components/input/custom-text-field';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const buildGrid = (key, title, content) => (
  <Grid item key={key} lg={3} md={6} xs={12}>
    <CustomCard title={title} content={content}/>
  </Grid>);

const buildInputField = (field, label, handleOnChange, defaultValue, type) => (
  <CustomTextField
    fullWidth
    id={field}
    label={label}
    onChange={(event) => handleOnChange(event.target.value)}
    size='small'
    defaultValue={defaultValue}
    type={type}
    variant='filled'
  />);

const buildNumberField = (field, label, handleOnChange, defaultValue) => buildInputField(field, label, handleOnChange, defaultValue, 'number');
  
const buildSelectField = (field, label, handleOnChange, defaultValue, lookup) => (
  <CustomTextField
    select
    fullWidth
    id={field}
    label={label}
    onChange={(event) => handleOnChange(event.target.value)}
    size='small'
    value={defaultValue}
    variant='filled'
  >
    {Object.keys(lookup).map((key) => (<MenuItem key={key} value={key}>{lookup[key]}</MenuItem>))}
  </CustomTextField>);

const buildTextField = (field, label, handleOnChange, defaultValue) => buildInputField(field, label, handleOnChange, defaultValue, 'text');

const convertToNumber = (val) => parseInt(val, 10);

const fixPlayer = player => {
  player.type = convertToNumber(player.type);
  player.status = convertToNumber(player.status);
  player.league1 = convertToNumber(player.league1);
  player.league2 = convertToNumber(player.league2);
  return player;
};

const useStyles = makeStyles((theme) => ({ 
  box: { backgroundColor: 'background.default', minHeight: '100%', paddingBottom: theme.spacing(3), paddingTop: theme.spacing(3) }
}));

const PlayerView = ({ enums, onClose, open, player }) => {
  const classes = useStyles();
  const newPlayer = player ? JSON.parse(JSON.stringify(player)) : {};
  const [age, setAge] = useState(newPlayer.age ?? 0);
  const [draftedPercentage, setDraftedPercentage] = useState(newPlayer.draftedPercentage ?? 0);
  const [draftRank, setDraftRank] = useState(newPlayer.draftRank ?? 0);
  const [firstName, setFirstName] = useState(newPlayer.firstName ?? '');
  const [lastName, setLastName] = useState(newPlayer.lastName ?? '');
  const [league1, setLeague1] = useState(newPlayer.league1 ?? 0);
  const [league2, setLeague2] = useState(newPlayer.league2 ?? 0);
  const [positions, setPositions] = useState(newPlayer.positions ?? '');
  const [status, setStatus] = useState(newPlayer.status ?? 0);
  const [team, setTeam] = useState(newPlayer.team ?? '');
  const [type, setType] = useState(newPlayer.type ?? 0);

  const baseballInfoContent = (
    <>
      {buildSelectField('type', 'Type', (value) => setType(value), type, enums.playerTypes)}
      {buildTextField('positions', 'Position(s)', (value) => setPositions(value), positions)}
      {buildTextField('team', 'Team', (value) => setTeam(value), team)}
      {buildSelectField('status', 'Status', (value) => setStatus(value), status, enums.playerStatuses)}
    </>
  );

  const draftInfoContent = (
    <>
      {buildNumberField('draftRank', 'Draft Rank', (value) => setDraftRank(value), draftRank)}
      {buildNumberField('draftedPercentage', 'Drafted %', (value) => setDraftedPercentage(value), draftedPercentage)}
    </>
  );

  const leagueInfoContent = (
    <>
      {buildSelectField('league1', 'League #1 Status', (value) => setLeague1(value), league1, enums.leagusStatuses)} 
      {buildSelectField('league2', 'League #2 Status', (value) => setLeague2(value), league2, enums.leagusStatuses)}
    </>
  );

  const personInfoContent = (
    <>
      {buildTextField('firstName', 'First Name', (value) => setFirstName(value), firstName)}
      {buildTextField('lastName', 'Last Name', (value) => setLastName(value), lastName)}
      {buildNumberField('age', 'Age', (value) => setAge(value), age)}
    </>
  );

  const handleCancel = () => { onClose(); };

  const handleSave = () => { 
    newPlayer.age = age;
    newPlayer.draftedPercentage = draftedPercentage;
    newPlayer.draftRank = draftRank;
    newPlayer.firstName = firstName;
    newPlayer.lastName = lastName;
    newPlayer.league1 = league1;
    newPlayer.league2 = league2;
    newPlayer.positions = positions;
    newPlayer.status = status;
    newPlayer.team = team;
    newPlayer.type = type;
    onClose(fixPlayer(newPlayer));
   };

  return (
    <>
      <Helmet>
        <title>Player View | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Dialog fullWidth={true} maxWidth='lg' open={open}>
        <DialogTitle disableTypography={true}><Typography color='textPrimary' variant='h4'>Edit Player</Typography></DialogTitle>
        <DialogContent>
          <Box className={classes.box}>
            <Container maxWidth={false}>
              <Grid container spacing={3}>
                {buildGrid('personInfo', 'Person Info', personInfoContent)}
                {buildGrid('baseballInfo', 'Baseball Info', baseballInfoContent)}
                {buildGrid('leagueInfo', 'League Info', leagueInfoContent)}
                {buildGrid('draftInfo', 'Draft Info', draftInfoContent)}
              </Grid>
            </Container>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleSave} variant='contained' component='label'>Save</Button>
          <Button color='secondary' onClick={handleCancel} variant='contained' component='label'>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

PlayerView.propTypes = { 
  enums: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired
};

export default PlayerView;