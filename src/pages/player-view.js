import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography } from "@material-ui/core";
import React, { useState } from 'react';

import CustomCard from "../components/card/custom-card";
import CustomTextField from '../components/input/custom-text-field';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const buildGrid = (key, title, content) => {
  return (
    <Grid item key={key} lg={3} md={6} xs={12}>
      <CustomCard title={title} content={content}/>
    </Grid>
  );
};

const buildInputField = (label, handleOnChange, defaultValue, type) => {
  return (
    <CustomTextField
      fullWidth
      label={label}
      onChange={(event) => handleOnChange(event.target.value)}
      size='small'
      defaultValue={defaultValue}
      type={type}
      variant='filled'
    />
  );
}

const buildNumberField = (label, handleOnChange, defaultValue) => { return buildInputField(label, handleOnChange, defaultValue, 'number'); }
  
const buildSelectField = (label, handleOnChange, defaultValue, lookup) => {
  return (
    <CustomTextField
      select
      fullWidth
      label={label}
      onChange={(event) => handleOnChange(event.target.value)}
      size='small'
      value={defaultValue}
      variant='filled'
    >
      {Object.keys(lookup).map((key) => (<MenuItem key={key} value={key}>{lookup[key]}</MenuItem>))}
    </CustomTextField>
  );
};

const buildTextField = (label, handleOnChange, defaultValue) => { return buildInputField(label, handleOnChange, defaultValue, 'text'); }

const PlayerView = ({onClose, open, player}) => {
  const [age, setAge] = useState(player ? player.age : 0);
  const [draftedPercentage, setDraftedPercentage] = useState(player ? player.draftedPercentage : 0);
  const [draftRank, setDraftRank] = useState(player ? player.draftRank : 0);
  const [firstName, setFirstName] = useState(player ? player.firstName : '');
  const [lastName, setLastName] = useState(player ? player.lastName : '');
  const [league1, setLeague1] = useState(player ? player.league1 : 0);
  const [league2, setLeague2] = useState(player ? player.league2 : 0);
  const [positions, setPositions] = useState(player ? player.positions : '');
  const [status, setStatus] = useState(player ? player.status : 0);
  const [team, setTeam] = useState(player ? player.team : '');
  const [type, setType] = useState(player ? player.type : 0);

  const baseballInfoContent = (
    <>
      {buildSelectField('Type', (value) => setType(value), type, { 0: '', 1: 'Batter', 2: 'Pitcher' })}
      {buildTextField('Position(s)', (value) => setPositions(value), positions)}
      {buildTextField('Team', (value) => setTeam(value), team)}
      {buildSelectField('Status', (value) => setStatus(value), status, { 0: '', 1: 'Disabled List', 2: 'Not Available', 3: 'New Entry' })}
    </>
  );

  const draftInfoContent = (
    <>
      {buildNumberField('Draft Rank', (value) => setDraftRank(value), draftRank)}
      {buildNumberField('Drafted %', (value) => setDraftedPercentage(value), draftedPercentage)}
    </>
  );

  const leagueInfoContent = (
    <>
      {buildSelectField('League #1 Status', (value) => setLeague1(value), league1, { 0: 'Available', 1: 'Rostered', 2: 'Unavailable', 3: 'Scouted' })} 
      {buildSelectField('League #2 Status', (value) => setLeague2(value), league2, { 0: 'Available', 1: 'Rostered', 2: 'Unavailable', 3: 'Scouted' })}
    </>
  );

  const personInfoContent = (
    <>
      {buildTextField('First Name', (value) => setFirstName(value), firstName)}
      {buildTextField('Last Name', (value) => setLastName(value), lastName)}
      {buildNumberField('Age', (value) => setAge(value), age)}
    </>
  );

  const handleCancel = () => { onClose(); };

  const handleSave = () => { 
    const newPlayer = Object.assign(player, {});
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
    onClose(newPlayer);
   };

  return (
    <>
      <Helmet>
        <title>Player View | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Dialog fullWidth={true} maxWidth='lg' open={open}>
        <DialogTitle disableTypography={true}><Typography color='textPrimary' variant='h4'>Edit Player</Typography></DialogTitle>
        <DialogContent>
          <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
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
          <Button onClick={handleSave} variant='contained' color='primary' component='label'>Save</Button>
          <Button onClick={handleCancel} variant='contained' color='secondary' component='label'>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

PlayerView.propTypes = { 
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired
};

export default PlayerView;