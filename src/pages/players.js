import { ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, Edit, FilterList, FirstPage, LastPage, Search } from '@material-ui/icons';
import { Box, Container, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { forwardRef, useEffect, useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TableHeaderCell from '../components/table-header-cell';

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

const compare = (a, b, orderBy) => b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;

const getComparator = (order, orderBy) => (a, b) => compare(a, b, orderBy) * (order === 'desc' ? 1 : -1);

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return (order !== 0) ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const useStyles = makeStyles({ container: { maxHeight: 500 } });

export default () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(25);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);
  const [players, setPlayers] = useState([]);
  const [severity, setSeverity] = useState('');
  
  useEffect(() => { getPlayers(); }, []);

  const buildSortHandler = (property) => (event) => handleRequestSort(event, property);

  const convertToNumber = (val) => { return parseInt(val, 10); };

  const fixPlayer = player => {
    player.type = convertToNumber(player.type);
    player.status = convertToNumber(player.status);
    player.league1 = convertToNumber(player.league1);
    player.league2 = convertToNumber(player.league2);
    return player;
  };

  const getAlign = (column) => column.type === 'numeric' ? 'right' : 'left';
  
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
    
  const handleRequestSort = (event, property) => {
    setOrder(orderBy === property && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
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
      <Box sx={{ backgroundColor: 'background.default', py: 3 }}>
        <Container maxWidth={false}>
          {isLoading 
            ? <Typography align="left" color="textPrimary" variant="h4">Loading Players...</Typography>
            :
              <Box>
                <Paper>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader size='small'>
                      <TableHead>
                        <TableRow>{columns.map((column) => 
                          <TableHeaderCell 
                            buildSortHandler={(key) => buildSortHandler(key)}
                            column={column} 
                            getAlign={(column) => getAlign(column)}
                            key={column.field} 
                            order={order}
                            orderBy={orderBy}
                          />)}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stableSort(players, getComparator(order, orderBy)).slice(page*limit, (page+1)*limit).map((player) => {
                          return (
                            <TableRow hover key={player.id}>
                              {columns.map((column) => 
                                <TableCell key={column.field} align={getAlign(column)}>{getValue(column, player[column.field])}</TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <TablePagination 
                  component="div" 
                  count={players.length} 
                  onPageChange={(event, newPage) => setPage(newPage)} 
                  onRowsPerPageChange={(event) => setLimit(event.target.value)} 
                  page={page} 
                  rowsPerPage={limit} 
                  rowsPerPageOptions={[25,50,100]}/>
                {!isLoading ? null :
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
                />}
              </Box>}
        </Container>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
}