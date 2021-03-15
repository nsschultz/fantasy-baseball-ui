import { Button, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import FileSaver  from 'file-saver';
import axios from 'axios';

const ImportExportData = () => {
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
  
  return (
    <div>
      <Button disabled={disabled} variant='contained' color='primary' component='label'>
        Upload Batter File
        <input type='file' onChange={onBatterFileChange} hidden />
      </Button>
      <Button disabled={disabled} variant='contained' color='primary' component='label'>
        Upload Pitcher File
        <input type='file' onChange={onPitcherFileChange} hidden />
      </Button>
      <Button disabled={disabled} variant='contained' color='primary' onClick={() => { mergeOnClick() }}>Merge Players</Button>
      <Button disabled={disabled} variant='contained' color='primary' onClick={() => { exportOnClick() }}>Export Players</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}

export default ImportExportData;