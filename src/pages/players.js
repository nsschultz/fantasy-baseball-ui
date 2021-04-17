import { ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, Edit, FilterList, FirstPage, LastPage, Search } from '@material-ui/icons';
import { Box, Container, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { forwardRef, useEffect, useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

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
  { title: 'Drafted Percentage', field: 'draftedPercentage', type: 'numeric', format: (value) => value.toFixed(2) }
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

const useStyles = makeStyles({ container: { maxHeight: 440 } });

export default () => {
  const classes = useStyles();
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  
  useEffect(() => { getPlayers(); }, []);

  const convertToNumber = (val) => { return parseInt(val, 10); };

  const fixPlayer = player => {
    player.type = convertToNumber(player.type);
    player.status = convertToNumber(player.status);
    player.league1 = convertToNumber(player.league1);
    player.league2 = convertToNumber(player.league2);
    return player;
  };
  
  const getPlayers = () => {
    axios
      .get('http://baseball-player-api.schultz.local/api/player')
      .then(response => { 
        setPlayers(response.data.players); 
        setIsLoading(false); 
      })
      .catch(() => { 
        setSeverity('error');
        setMessage('Unable to load players');
        setOpen(true); 
        setIsLoading(false);
      });
  };

  const getValue = (column, value) => column.format && typeof value === 'number' ? column.format(value) : column.lookup ? column.lookup[value] : value;
  
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
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
        <Container maxWidth={false}>
          {isLoading 
            ? <Typography align="left" color="textPrimary" variant="h4">Loading Players...</Typography>
            :
              <Box>
                <Paper>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader size='small'>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (<TableCell key={column.field} align={column.type === 'numeric' ? 'right' : 'left'}>{column.title}</TableCell>))}                        
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {players.map((player) => {
                          return (
                            <TableRow hover key={player.id}>
                              {columns.map((column) => 
                                <TableCell key={column.field} align={column.type === 'numeric' ? 'right' : 'left'}>{getValue(column, player[column.field])}</TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <MaterialTable 
                  title='Players' 
                  columns={columns} 
                  icons={tableIcons} 
                  options={{ filtering: true, paging: true, pageSize: 25, pageSizeOptions: [25,50,100] }} 
                  data={players}
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
                      const fixedPlayer = fixPlayer(newData);
                      updatePlayer(newData.id, fixedPlayer);
                      const dataUpdate = [...players];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = fixedPlayer;
                      setPlayers([...dataUpdate]);
                      resolve();
                    }),
                  }}
                />
              </Box>}
        </Container>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}