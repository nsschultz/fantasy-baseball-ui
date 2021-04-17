import { Box, Button, Container, Grid, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import FileSaver  from 'file-saver';
import { Helmet } from 'react-helmet';
import IntegrationCard from '../components/integration-card';
import axios from 'axios';

export default () => {
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const exportOnClick = () => {
    setDisabled(true);
    axios
      .get('http://baseball-player-api.schultz.local/api/player/export', { responseType: 'blob' })
      .then(response => {
        FileSaver.saveAs(new Blob([response.data]), 'players.csv');
        setSnackbar('success', '', false, false);
      })
      .catch(() => setSnackbar('error', 'Failed to export the players.', true, false));
  }

  const mergeOnClick = () => {
    setDisabled(true);
    axios
      .post('http://baseball-player-api.schultz.local/api/player/merge')
      .then(() => setSnackbar('success', 'Successfully completed the player merge.', true, false))
      .catch(() => setSnackbar('error', 'Failed to complete the player merge.', true, false));
  }

  const onBatterFileChange = event => onFileChange(event.target.files[0], 'batters');

  const onFileChange = (file, type) => {
    setDisabled(true);
    const formData = new FormData();
    formData.append(`${type}.csv`, file, file.name);
    axios
      .post(`http://baseball-bhq-stats-api.schultz.local/api/bhq-stats/${type}/upload`, formData)
      .then(() => setSnackbar('success', `Successfully uploaded the ${type} file.`, true, false))
      .catch(() => setSnackbar('error', `Failed to upload the ${type} file.`, true, false));
  }

  const onPitcherFileChange = event => onFileChange(event.target.files[0], 'pitchers');

  const setSnackbar = (sev, msg, op, dis) => {
    setSeverity(sev);
    setMessage(msg);
    setOpen(op);
    setDisabled(dis);
  }

  const exportPlayersButton = (<Button disabled={disabled} variant='contained' color='primary' onClick={() => { exportOnClick() }}>Export</Button>);
  const mergePlayersButton = (<Button disabled={disabled} variant='contained' color='primary' onClick={() => { mergeOnClick() }}>Merge</Button>);
  const uploadBattersFileButton = (
    <Button disabled={disabled} variant='contained' color='primary' component='label'>Upload<input type='file' onChange={onBatterFileChange} hidden/></Button>
  );
  const uploadPitchersFileButton = (
    <Button disabled={disabled} variant='contained' color='primary' component='label'>Upload<input type='file' onChange={onPitcherFileChange} hidden/></Button>
  );

  return (
    <>
      <Helmet>
        <title>Integrations | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item key='uploadBatters' lg={6} md={6} xs={12}>
              <IntegrationCard 
                integration={{ title: 'Upload Batter File', description: 'Upload the latest version of the batting stats data.' }} 
                integrationButton={uploadBattersFileButton}/>
            </Grid>
            <Grid item key='uploadPitchers' lg={6} md={6} xs={12}>
              <IntegrationCard 
                integration={{ title: 'Upload Pitcher File', description: 'Upload the latest version of the pitching stats data.' }} 
                integrationButton={uploadPitchersFileButton}/>
            </Grid>
            <Grid item key='mergePlayers' lg={6} md={6} xs={12}>
              <IntegrationCard 
                integration={{ title: 'Merge Players', description: 'Merge the new stats data with the existing player data.' }} 
                integrationButton={mergePlayersButton}/>
            </Grid>
            <Grid item key='exportPlayers' lg={6} md={6} xs={12}>
              <IntegrationCard 
                integration={{ title: 'Export Players', description: 'Download the latest version of the player data.' }} 
                integrationButton={exportPlayersButton}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}