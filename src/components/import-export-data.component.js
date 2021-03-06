import { Button, Snackbar } from '@material-ui/core';
import React, { Component } from 'react';

import Alert from '@material-ui/lab/Alert';
import FileSaver  from 'file-saver';
import axios from 'axios';

export default class ImportExportData extends Component {
  state = { severity: '', message: '', open: false, disabled: false };

  exportOnClick() {
    this.setState({disabled: true})
    axios
      .get('http://baseball-player-api.schultz.local/api/player/export', { responseType: 'blob' })
      .then(response => {
        FileSaver.saveAs(new Blob([response.data]), 'players.csv');
        this.setState(() => ({ severity: 'success', open: false, disabled: false }));
      })
      .catch(() => this.setState(() => ({ severity: 'error', message: 'Failed to export the players.', open: true, disabled: false })));
  }

  mergeOnClick() {
    this.setState({disabled: true})
    axios
      .post('http://baseball-player-api.schultz.local/api/player/merge')
      .then(() => this.setState(() => ({ severity: 'success', message: 'Successfully completed the player merge.', open: true, disabled: false })))
      .catch(() => this.setState(() => ({ severity: 'error', message: 'Failed to complete the player merge.', open: true, disabled: false })));
  }

  onBatterFileChange = event => { this.onFileChange(event.target.files[0], 'batters'); };

  onFileChange(file, type) {
    this.setState({disabled: true})
    const formData = new FormData();
    formData.append(`${type}.csv`, file, file.name);
    axios
      .post(`http://baseball-bhq-stats-api.schultz.local/api/bhq-stats/${type}/upload`, formData)
      .then(() => this.setState(() => ({ severity: 'success', message: `Successfully uploaded the ${type} file.`, open: true, disabled: false })))
      .catch(() => this.setState(() => ({ severity: 'error', message: `Failed to upload the ${type} file.`, open: true, disabled: false })));
  }

  onPitcherFileChange = event => { this.onFileChange(event.target.files[0], 'pitchers'); };
  
  render() {
    return (
      <div>
        <Button disabled={this.state.disabled} variant='contained' color='primary' component='label'>
          Upload Batter File
          <input type='file' onChange={this.onBatterFileChange} hidden />
        </Button>
        <Button disabled={this.state.disabled} variant='contained' color='primary' component='label'>
          Upload Pitcher File
          <input type='file' onChange={this.onPitcherFileChange} hidden />
        </Button>
        <Button disabled={this.state.disabled} variant='contained' color='primary' onClick={() => { this.mergeOnClick() }}>Merge Players</Button>
        <Button disabled={this.state.disabled} variant='contained' color='primary' onClick={() => { this.exportOnClick() }}>Export Players</Button>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={() => this.setState({ open: false })}>
          <Alert severity={this.state.severity}>{this.state.message}</Alert>
        </Snackbar>
      </div>
    );
  }
}