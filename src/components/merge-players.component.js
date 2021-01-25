import { Button, Snackbar } from '@material-ui/core';
import React, { Component } from 'react';

import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

export default class MergePlayers extends Component {
  state = { severity: "", message: "", open: false, disabled: false };

  onClick() {
    this.setState({disabled: true})
    axios
      .post('http://baseball-merge-api.schultz.local/api/player/merge')
      .then(() => this.setState(() => ({ severity: "success", message: "Successfully completed the player merge.", open: true, disabled: false })))
      .catch(() => this.setState(() => ({ severity: "error", message: "Failed to complete the player merge.", open: true, disabled: false })));
  }
  
  render() {
    return (
      <div>
        <Button disabled={this.state.disabled} variant="contained" color="primary" onClick={() => { this.onClick() }}>Merge Players</Button>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={() => this.setState({ open: false })}>
          <Alert severity={this.state.severity}>{this.state.message}</Alert>
        </Snackbar>
      </div>
    );
  }
}