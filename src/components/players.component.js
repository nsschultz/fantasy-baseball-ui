import { ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, Edit, FilterList, FirstPage, LastPage, Search } from '@material-ui/icons';
import React, { Component, forwardRef } from 'react';

import Alert from '@material-ui/lab/Alert';
import MaterialTable from 'material-table'
import { Snackbar } from '@material-ui/core';
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
  { title: 'Drafted Percentage', field: 'draftedPercentage', type: 'numeric' }
];

const tableIcons = {
  //Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  //Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  //DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  //Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  //ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  //ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default class Players extends Component {
  
  state = { players: [], isLoading: true, severity: '', message: '', open: false };
  
  componentDidMount() { this.getPlayers(); }

  convertToNumber(val) { return parseInt(val, 10); }

  fixPlayer(player) {
    player.type = this.convertToNumber(player.type);
    player.status = this.convertToNumber(player.status);
    player.league1 = this.convertToNumber(player.league1);
    player.league2 = this.convertToNumber(player.league2);
    return player;
  }
  
  getPlayers() {
    axios
      .get('http://baseball-player-api.schultz.local/api/player')
      .then(response => this.setState(() => ({ players: response.data.players, isLoading: false })))
      .catch(() => this.setState(() => ({ severity: 'error', message: 'Unable to load players', open: true, isLoading: false })));
  }

  updatePlayer(id, player) {
    axios
      .put(`http://baseball-player-api.schultz.local/api/player/${id}`, player)
      .then(() => this.setState(() => ({ severity: 'success', message: 'Successfully updated player', open: true })))
      .catch(() => this.setState(() => ({ severity: 'error', message: 'Unable to update player', open: true })));
  }
    
  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        {this.state.isLoading 
          ? <Typography variant='h6' noWrap>Loading Players...</Typography>
          : <MaterialTable 
              title='Players' 
              columns={columns} 
              icons={tableIcons} 
              options={{ filtering: true, paging: true, pageSize: 25, pageSizeOptions: [25,50,100] }} 
              data={this.state.players}
              editable={{
                // onRowAdd: newData => new Promise((resolve) => { 
                //   setTimeout(() => { 
                //     this.setState(() => ({ players: [...this.state.players, newData] }));
                //     resolve(); 
                //   }, 10000) }),
                // onRowDelete: oldData => new Promise((resolve) => {
                //   setTimeout(() => {
                //     const dataDelete = [...this.state.players];
                //     const index = oldData.tableData.id;
                //     dataDelete.splice(index, 1);
                //     this.setState(() => ({ players: [...dataDelete] }));
                //     resolve();
                //   }, 10000) }),
                onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                  const fixedPlayer = this.fixPlayer(newData);
                  this.updatePlayer(newData.id, fixedPlayer);
                  const dataUpdate = [...this.state.players];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = fixedPlayer;
                  this.setState(() => ({ players: [...dataUpdate] }));
                  resolve();
                }),
              }}
            />}
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={() => this.setState({ open: false })}>
          <Alert severity={this.state.severity}>{this.state.message}</Alert>
        </Snackbar>
      </div>
    );
  }
}