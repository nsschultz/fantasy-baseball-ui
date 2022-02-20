import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import FileSaver  from 'file-saver';
import { Helmet } from 'react-helmet';
import IntegrationCard from '../components/card/integration-card';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({ 
  box: { 
    backgroundColor: 'background.default', 
    minHeight: '100%', 
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3) 
  }
}));

export default () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');

  const exportOnClick = () => {
    setDisabled(true);
    axios
      .get('http://baseball-player-api.schultz.local/api/v1/action/export', { responseType: 'blob' })
      .then(response => {
        FileSaver.saveAs(new Blob([response.data]), 'players.csv');
        setSnackbar('success', '', false, false);
      })
      .catch(() => setSnackbar('error', 'Failed to export the players.', true, false));
  };

  const handleDialogClose = (shouldClear) => {
    setDialogOpen(false);
    if (!shouldClear) return;
    setDisabled(true);
    axios
      .delete('http://baseball-player-api.schultz.local/api/v1/player')
      .then(() => setSnackbar('success', 'Successfully cleared the players.', true, false))
      .catch(() => setSnackbar('error', 'Failed to clear the players.', true, false));
  };

  const mergeOnClick = () => {
    setDisabled(true);
    axios
      .post('http://baseball-player-api.schultz.local/api/v1/action/merge')
      .then(() => setSnackbar('success', 'Successfully completed the player merge.', true, false))
      .catch(() => setSnackbar('error', 'Failed to complete the player merge.', true, false));
  };

  const onBatterFileChange = event => onFileChange(event.target.files[0], 'batters');

  const onFileChange = (file, type) => {
    setDisabled(true);
    const formData = new FormData();
    formData.append(`${type}.csv`, file, file.name);
    axios
      .post(`http://baseball-player-api.schultz.local/api/v1/projection/${type}/upload`, formData)
      .then(() => setSnackbar('success', `Successfully uploaded the ${type} file.`, true, false))
      .catch(() => setSnackbar('error', `Failed to upload the ${type} file.`, true, false));
  };

  const onPitcherFileChange = event => onFileChange(event.target.files[0], 'pitchers');

  const setSnackbar = (sev, msg, op, dis) => {
    setSeverity(sev);
    setMessage(msg);
    setOpen(op);
    setDisabled(dis);
  };

  const clearPlayersButton = 
    (<Button color='primary' disabled={disabled} onClick={() => setDialogOpen(true)} variant='contained'>Clear</Button>);
  const exportPlayersButton = 
    (<Button color='primary' disabled={disabled} onClick={() => exportOnClick()} variant='contained'>Export</Button>);
  const mergePlayersButton = 
    (<Button color='primary' disabled={disabled} onClick={() => mergeOnClick()} variant='contained'>Merge</Button>);
  const uploadBattersFileButton = (
    <Button color='primary' component='label' disabled={disabled} variant='contained'>Upload<input hidden onChange={onBatterFileChange} type='file'/></Button>
  );
  const uploadPitchersFileButton = (
    <Button color='primary' component='label' disabled={disabled} variant='contained'>Upload<input hidden onChange={onPitcherFileChange} type='file'/></Button>
  );

  return (
    <>
      <Helmet>
        <title>Integrations | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Box className={classes.box}>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item key='uploadBatters' lg={6} md={6} xs={12}>
              <IntegrationCard 
                title='Upload Batter File'
                description='Upload the latest version of the batting stats data.'
                integrationButton={uploadBattersFileButton}/>
            </Grid>
            <Grid item key='uploadPitchers' lg={6} md={6} xs={12}>
              <IntegrationCard 
                title='Upload Pitcher File'
                description='Upload the latest version of the pitching stats data.'
                integrationButton={uploadPitchersFileButton}/>
            </Grid>
            <Grid item key='mergePlayers' lg={6} md={6} xs={12}>
              <IntegrationCard 
                title='Merge Players'
                description='Merge the new stats data with the existing player data.'
                integrationButton={mergePlayersButton}/>
            </Grid>
            <Grid item key='exportPlayers' lg={6} md={6} xs={12}>
              <IntegrationCard 
                title='Export Players'
                description='Download the latest version of the player data.'
                integrationButton={exportPlayersButton}/>
            </Grid>
            <Grid item key='clearPlayers' lg={6} md={6} xs={12}>
              <IntegrationCard 
                title='Clear Players'
                description='Clear the list of players from the previous season.'
                integrationButton={clearPlayersButton}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Dialog open={dialogOpen} onClose={() => handleDialogClose(false)}>
        <DialogContent>
          <DialogContentText>Are you sure you want to clear the players?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={() => handleDialogClose(false)} variant='contained'>No</Button>
          <Button color='secondary' onClick={() => handleDialogClose(true)} variant='contained'>Yes</Button>
        </DialogActions>
      </Dialog>
      <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} autoHideDuration={2000} onClose={() => setOpen(false)} open={open}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}