import { Box, Container, Snackbar, Typography } from "@mui/material";
import { getLeagueStatusEnums, getPlayerStatusEnums, getPlayerTypeEnums, getPositions, getStatsTypeEnums, getTeams } from "../funcs/get-lookups";
import { useDispatch, useSelector } from "react-redux";

import Alert from "@mui/material/Alert";
import { Helmet } from "react-helmet";
import ParentTable from "../components/table/parent-table";
import PlayerEditor from "../dialogs/player-editor";
import PlayerFilter from "../dialogs/player-filter";
import React from "react";
import axios from "axios";
import { matchAnyPosition } from "../funcs/position-helper";
import { modifyFilter } from "../state/slice/player-filter-slice";

const convertToNumber = (val) => parseInt(val, 10);

/**
 * The player window which is used for admin level function against players.
 * @returns A new instance of Player.
 */
const Players = () => {
  const isMountedRef = React.useRef(null);
  const filters = useSelector((state) => state.playerFilter.value);
  const [filteredPlayers, setFilteredPlayers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [leagusStatuses, setLeagueStatuses] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [players, setPlayers] = React.useState([]);
  const [playerStatuses, setPlayerStatuses] = React.useState([]);
  const [playerTypes, setPlayerTypes] = React.useState([]);
  const [positions, setPositions] = React.useState([]);
  const [statsType, setStatsType] = React.useState([]);
  const [severity, setSeverity] = React.useState("success");
  const [teams, setTeams] = React.useState([]);
  const columns = [
    { align: "right", field: "bhqId", title: "BHQ ID" },
    { field: "name", title: "Name" },
    { align: "right", field: "age", title: "Age" },
    { field: "type", format: (value) => playerTypes[value], title: "Type" },
    { field: "positions", format: (value) => value.map((p) => p.code).join(), title: "Position(s)" },
    { field: "team", format: (value) => value.code, title: "Team" },
    { field: "status", format: (value) => playerStatuses[value], title: "Status" },
    { field: "league1", format: (value) => leagusStatuses[value], title: "League #1 Status" },
    { field: "league2", format: (value) => leagusStatuses[value], title: "League #2 Status" },
    { align: "right", field: "draftRank", title: "Draft Rank" },
    { align: "right", field: "draftedPercentage", format: (value) => value.toFixed(2), title: "Drafted %" },
  ];
  const columnsBattingStats = [
    { field: "statsType", format: (value) => statsType[value], title: "" },
    { align: "right", field: "atBats", title: "AB" },
    { align: "right", field: "runs", title: "R" },
    { align: "right", field: "hits", title: "H" },
    { align: "right", field: "doubles", title: "2B" },
    { align: "right", field: "triples", title: "3B" },
    { align: "right", field: "homeRuns", title: "HR" },
    { align: "right", field: "runsBattedIn", title: "RBI" },
    { align: "right", field: "baseOnBalls", title: "BB" },
    { align: "right", field: "strikeOuts", title: "K" },
    { align: "right", field: "stolenBases", title: "SB" },
    { align: "right", field: "caughtStealing", title: "CS" },
    { align: "right", field: "totalBases", title: "TB" },
    { align: "right", field: "battingAverage", format: (value) => value.toFixed(3), title: "BA" },
    { align: "right", field: "onBasePercentage", format: (value) => value.toFixed(3), title: "OB" },
    { align: "right", field: "sluggingPercentage", format: (value) => value.toFixed(3), title: "SLG" },
    { align: "right", field: "onBasePlusSlugging", format: (value) => value.toFixed(3), title: "OPS" },
    { align: "right", field: "contractRate", format: (value) => value.toFixed(2), title: "CT%" },
    { align: "right", field: "power", format: (value) => value.toFixed(0), title: "PX" },
    { align: "right", field: "walkRate", format: (value) => value.toFixed(2), title: "BB%" },
    { align: "right", field: "speed", format: (value) => value.toFixed(0), title: "SPD" },
    { align: "right", field: "basePerformanceValue", format: (value) => value.toFixed(0), title: "BPV" },
  ];
  const columnsPitchingStats = [
    { field: "statsType", format: (value) => statsType[value], title: "" },
    { align: "right", field: "wins", title: "W" },
    { align: "right", field: "losses", title: "L" },
    { align: "right", field: "qualityStarts", title: "QS" },
    { align: "right", field: "saves", title: "SV" },
    { align: "right", field: "blownSaves", title: "BS" },
    { align: "right", field: "holds", title: "HLD" },
    { align: "right", field: "inningsPitched", format: (value) => value.toFixed(1), title: "IP" },
    { align: "right", field: "hitsAllowed", title: "HA" },
    { align: "right", field: "earnedRuns", title: "ER" },
    { align: "right", field: "homeRunsAllowed", title: "HRA" },
    { align: "right", field: "baseOnBallsAllowed", title: "BBA" },
    { align: "right", field: "strikeOuts", title: "K" },
    { align: "right", field: "earnedRunAverage", format: (value) => value.toFixed(2), title: "ERA" },
    { align: "right", field: "walksAndHitsPerInningPitched", format: (value) => value.toFixed(2), title: "WHIP" },
    { align: "right", field: "battingAverageOnBallsInPlay", format: (value) => value.toFixed(3), title: "BABIP" },
    { align: "right", field: "strandRate", format: (value) => value.toFixed(2), title: "SR" },
    { align: "right", field: "command", format: (value) => value.toFixed(2), title: "CMD" },
    { align: "right", field: "dominance", format: (value) => value.toFixed(2), title: "DOM" },
    { align: "right", field: "control", format: (value) => value.toFixed(2), title: "CON" },
    { align: "right", field: "groundBallToFlyBallRate", format: (value) => value.toFixed(2), title: "GB/FB" },
    { align: "right", field: "basePerformanceValue", format: (value) => value.toFixed(0), title: "BPV" },
  ];

  React.useEffect(() => {
    isMountedRef.current = true;
    getLeagueStatusEnums((response) => setLeagueStatuses(response));
    getPlayerStatusEnums((response) => setPlayerStatuses(response));
    getPlayerTypeEnums((response) => setPlayerTypes(response));
    getPositions((response) => setPositions(response));
    getStatsTypeEnums((response) => setStatsType(response));
    getTeams((response) => setTeams(response));
    getPlayers();
    return () => (isMountedRef.current = false);
  }, []);
  React.useEffect(() => {
    onHandleFilterChange();
  }, [filters]);

  const buildEdit = (handleEditClose, editOpen, editRow) => (
    <PlayerEditor lookups={buildLookups()} onClose={handleEditClose} open={editOpen} player={editRow} />
  );
  const buildFilter = (handleFilterClose, filterOpen) => <PlayerFilter lookups={buildLookups()} onClose={handleFilterClose} open={filterOpen} />;
  const buildLookups = () => {
    return {
      leagusStatuses: leagusStatuses,
      playerStatuses: playerStatuses,
      playerTypes: playerTypes,
      positions: positions,
      teams: teams,
    };
  };
  const dispatch = useDispatch();
  const getChildRows = (player) => (player.type === 1 ? player.battingStats : player.pitchingStats);
  const getPlayers = () => {
    axios
      .get(`${window.env.PLAYER_API_URL}/api/v2/player`)
      .then((response) => {
        if (isMountedRef.current) {
          response.data.forEach((p) => (p.name = `${p.firstName} ${p.lastName}`));
          setPlayers(response.data);
          setFilteredPlayers(response.data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setSeverity("error");
        setMessage("Unable to load players");
        setOpen(true);
        setIsLoading(false);
      });
  };
  const onHandleFilterChange = () => {
    const actions = [];
    if (filters.name) actions.push((player) => player.name.toLowerCase().includes(filters.name.toLowerCase()));
    if (filters.positions.length > 0) actions.push((player) => filters.positions.map((p) => p.code).some((v) => matchAnyPosition(player.positions, v, true)));
    if (filters.l1statuses.length > 0) actions.push((player) => filters.l1statuses.some((v) => convertToNumber(v) === player.league1));
    if (filters.l2statuses.length > 0) actions.push((player) => filters.l2statuses.some((v) => convertToNumber(v) === player.league2));
    if (filters.statuses.length > 0) actions.push((player) => filters.statuses.some((v) => convertToNumber(v) === player.status));
    if (filters.teams.length > 0) actions.push((player) => filters.teams.some((v) => v.code === player.team.code));
    if (filters.types.length > 0) actions.push((player) => filters.types.some((v) => convertToNumber(v) === player.type));
    setFilteredPlayers(actions.length === 0 ? players : players.filter((player) => actions.length === actions.filter((filter) => filter(player)).length));
  };
  const onRowUpdate = (newData) => {
    if (!newData) return;
    updatePlayer(newData.id, newData);
    const dataUpdate = players.map((p) => (p.id === newData.id ? newData : p));
    setPlayers([...dataUpdate]);
    return dataUpdate;
  };
  const searchbarChangeHandler = (event) => dispatch(modifyFilter({ key: "name", value: event.target.value || "" }));
  const statsSelection = (player) => (player.type === 1 ? columnsBattingStats : columnsPitchingStats);
  const updatePlayer = (id, player) => {
    axios
      .put(`${window.env.PLAYER_API_URL}/api/v2/player/${id}`, player)
      .then(() => {
        setSeverity("success");
        setMessage("Successfully updated player");
        setOpen(true);
      })
      .catch(() => {
        setSeverity("error");
        setMessage("Unable to update player");
        setOpen(true);
      });
  };

  return (
    <>
      <Helmet>
        <title>Players | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Box sx={{ backgroundColor: "background.default", paddingBottom: 3, paddingTop: 3 }}>
        <Container maxWidth={false}>
          {isLoading ? (
            <Typography align="left" color="textPrimary" variant="h4">
              Loading Players...
            </Typography>
          ) : (
            <ParentTable
              childProps={{ columnSelector: statsSelection, rowKeyBuilder: (row) => row.statsType, rowSelector: getChildRows, title: "Season Stats" }}
              columns={columns}
              editProps={{ buildDialog: buildEdit, handleClose: onRowUpdate }}
              toolbarProps={{
                filterProps: { buildDialog: buildFilter, handleClose: onHandleFilterChange },
                searchProps: { handleSearch: searchbarChangeHandler, placeholder: "Search Player by Name" },
                title: "Players",
              }}
              values={filteredPlayers}
            />
          )}
        </Container>
      </Box>
      <Snackbar anchorOrigin={{ horizontal: "center", vertical: "bottom" }} autoHideDuration={2000} onClose={() => setOpen(false)} open={open}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  );
};
export default Players;
