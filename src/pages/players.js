import { ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, Edit, FilterList, FirstPage, LastPage, Search } from '@material-ui/icons';
import { Box, Container, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';
import MaterialTable from 'material-table';
import TableHeaderCell from '../components/table/table-header-cell';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

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
  { title: 'Drafted %', field: 'draftedPercentage', type: 'numeric', format: (value) => value.toFixed(2) }
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

const applyFilter = (column, field) => {
  if (column.lookup) return column.filterValue.length === 0 || column.filterValue.some(v => convertToNumber(v) === field);
  if (column.type === 'numeric') return field === convertToNumber(column.filterValue);
  return field && field.toLowerCase().includes(column.filterValue.toLowerCase());
};

const applyFilters = (columns, rows) => {
  var columnsWithFilter = columns.filter((column) => column.filterValue);
  if (columnsWithFilter.length == 0) return rows;
  return rows.filter(row => columnsWithFilter.length == columnsWithFilter.filter(column => applyFilter(column, row[column.field])).length);
};

const convertToNumber = (val) => { return parseInt(val, 10); };

const compare = (a, b, orderBy) => b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;

const fixPlayer = player => {
  player.type = convertToNumber(player.type);
  player.status = convertToNumber(player.status);
  player.league1 = convertToNumber(player.league1);
  player.league2 = convertToNumber(player.league2);
  return player;
};

const getAlign = (column) => column.type === 'numeric' ? 'right' : 'left';

const getComparator = (order, orderBy) => (a, b) => compare(a, b, orderBy) * (order === 'desc' ? 1 : -1);

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return (order !== 0) ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const useStyles = makeStyles({ container: { display: 'flex', maxHeight: 750, overflowX: 'auto' } });

export default () => {
  const classes = useStyles();
  const isMountedRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(25);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  const [players, setPlayers] = useState([]);
  const [rows, setRows] = useState([]);
  const [severity, setSeverity] = useState('');
  
  useEffect(() => { 
    isMountedRef.current = true;
    getPlayers();
    () => { isMountedRef.current = false; }
   }, []);

   useEffect(() => { 
     setRows(buildRows(columns, players));
   }, [limit, order, orderBy, page]);

  const buildRows = (columns, rows) => {
    const filteredRows = applyFilters(columns, rows);
    setPlayerCount(filteredRows.length);
    return stableSort(filteredRows, getComparator(order, orderBy))
      .slice(page*limit, (page+1)*limit)
      .map((row) => {
        return (
          <TableRow hover key={row.id}>
            <TableCell>
              <IconButton size='small'><Edit fontSize='inherit'/></IconButton>
            </TableCell>
            {columns.map((column) => 
              <TableCell key={column.field} align={getAlign(column)}>{getValue(column, row[column.field])}</TableCell>
            )}
          </TableRow>
        );
      });
  };

  const buildSortHandler = (property) => (event) => handleRequestSort(event, property);

  const getPlayers = () => {
    axios
    .get('http://baseball-player-api.schultz.local/api/player')
    .then(response => { 
      if (isMountedRef.current) {
        setRows(buildRows(columns, response.data.players));
        setPlayers(response.data.players); 
        setIsLoading(false); 
      }
    })
    .catch(() => { 
      setSeverity('error');
      setMessage('Unable to load players');
      setOpen(true); 
      setIsLoading(false);
    });
  }

  const getValue = (column, value) => column.format && typeof value === 'number' ? column.format(value) : column.lookup ? column.lookup[value] : value;
    
  const handleRequestSort = (event, property) => {
    setOrder(orderBy === property && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onHandleFilterChange = (field, filterValue) => {
    columns.filter((column) => column.field === field).forEach((column) => column.filterValue = filterValue);
    setRows(buildRows(columns, players));
  }
  
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
            ? <Typography align='left' color='textPrimary' variant='h4'>Loading Players...</Typography>
            :
              <Box>
                <Paper>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell align='left'/>
                          {columns.map((column) => 
                            <TableHeaderCell 
                              buildSortHandler={(key) => buildSortHandler(key)}
                              column={column} 
                              onHandleFilterChange={onHandleFilterChange}
                              getAlign={(column) => getAlign(column)}
                              key={column.field} 
                              order={order}
                              orderBy={orderBy}
                            />)}
                        </TableRow>
                      </TableHead>
                      <TableBody>{rows}</TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <TablePagination 
                  component='div' 
                  count={playerCount} 
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