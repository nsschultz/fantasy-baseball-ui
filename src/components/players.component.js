import { ArrowDownward, ChevronLeft, ChevronRight, Clear, FilterList, FirstPage, LastPage, Search } from '@material-ui/icons';
import React, { Component, forwardRef } from "react";

import MaterialTable from 'material-table'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const columns = [
  { title: "First Name", field: "playerInfo.firstName" },
  { title: "Last Name", field: "playerInfo.lastName" },
  { title: "Age", field: "playerInfo.age", type: "numeric" },
  { title: "Type", field: "playerInfo.type", lookup: { 0: "", 1: "Batter", 2: "Pitcher" } },
  { title: "Position(s)", field: "playerInfo.positions" },
  { title: "Team", field: "playerInfo.team" },
  { title: "Status", field: "playerInfo.status", lookup: { 0: "", 1: "Disabled LIst", 2: "Not Available", 3: "New Entry" }},
  { title: "League #1 Status", field: "leagueInfo.league1", lookup: { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" }},
  { title: "League #2 Status", field: "leagueInfo.league2", lookup: { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" }}
];

const tableIcons = {
  //Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  //Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  //Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  //Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  //DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  //Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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
  state = { players: [], isLoading: true, errorMessage: null };
  
  componentDidMount() { this.getPlayers(); }
  
  getPlayers() {
    axios
      .get("http://baseball-player-api.schultz.local/api/player")
      .then(response => this.setState(() => ({ players: response.data.players, isLoading: false })))
      .catch(() => this.setState(() => ({ errorMessage: "Unable to load players", isLoading: false })));
  }
    
  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        {this.state.isLoading 
          ? <Typography variant="h6" noWrap>Loading Players...</Typography>
          : <MaterialTable icons={tableIcons} title="Players" columns={columns} options={{ filtering: true }} data={this.state.players} />}
      </div>
    );
  }
}