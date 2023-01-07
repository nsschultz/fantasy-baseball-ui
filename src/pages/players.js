import { Box, Container, Snackbar, Typography } from "@mui/material";
import { buildPositionDisplayMap, matchAnyPosition } from "../funcs/position-helper";
import { getLeagueStatusEnums, getPlayerStatusEnums, getPlayerTypeEnums, getPositions, getStatsTypeEnums, getTeams } from "../funcs/get-lookups";

import Alert from "@mui/material/Alert";
import { Helmet } from "react-helmet";
import ParentTable from "../components/table/parent-table";
import PlayerView from "./player-view";
import React from "react";
import axios from "axios";
import { buildTeamDisplayMap } from "../funcs/team-helper";

const columns = [
  { field: "bhqId", title: "BHQ ID", type: "numeric", width: 75 },
  { field: "firstName", title: "First Name" },
  { field: "lastName", title: "Last Name" },
  { field: "age", title: "Age", type: "numeric", width: 75 },
  { field: "type", lookup: [], title: "Type" },
  {
    field: "positions",
    filterMatcher: (filterValue, field) => filterValue.some((v) => matchAnyPosition(field, v, true)),
    format: (value) => value.map((p) => p.code).join(),
    lookup: [],
    title: "Position(s)",
  },
  {
    field: "team",
    filterMatcher: (filterValue, field) => filterValue.some((v) => v === field.code),
    format: (value) => value.code,
    lookup: [],
    title: "Team",
    width: 75,
  },
  { field: "status", lookup: [], title: "Status" },
  { field: "league1", lookup: [], title: "League #1 Status" },
  { field: "league2", lookup: [], title: "League #2 Status" },
  { field: "draftRank", title: "Draft Rank", type: "numeric" },
  { field: "draftedPercentage", format: (value) => value.toFixed(2), title: "Drafted %", type: "numeric" },
];
const columnsBattingStats = [
  { title: "", field: "statsType" },
  { title: "AB", field: "atBats", type: "numeric" },
  { title: "R", field: "runs", type: "numeric" },
  { title: "H", field: "hits", type: "numeric" },
  { title: "2B", field: "doubles", type: "numeric" },
  { title: "3B", field: "triples", type: "numeric" },
  { title: "HR", field: "homeRuns", type: "numeric" },
  { title: "RBI", field: "runsBattedIn", type: "numeric" },
  { title: "BB", field: "baseOnBalls", type: "numeric" },
  { title: "K", field: "strikeOuts", type: "numeric" },
  { title: "SB", field: "stolenBases", type: "numeric" },
  { title: "CS", field: "caughtStealing", type: "numeric" },
  { title: "TB", field: "totalBases", type: "numeric" },
  { title: "BA", field: "battingAverage", type: "numeric", format: (value) => value.toFixed(3) },
  { title: "OB", field: "onBasePercentage", type: "numeric", format: (value) => value.toFixed(3) },
  { title: "SLG", field: "sluggingPercentage", type: "numeric", format: (value) => value.toFixed(3) },
  { title: "OPS", field: "onBasePlusSlugging", type: "numeric", format: (value) => value.toFixed(3) },
  { title: "CT%", field: "contractRate", type: "numeric", format: (value) => value.toFixed(2) },
  { title: "PX", field: "power", type: "numeric", format: (value) => value.toFixed(0) },
  { title: "BB%", field: "walkRate", type: "numeric", format: (value) => value.toFixed(2) },
  { title: "SPD", field: "speed", type: "numeric", format: (value) => value.toFixed(0) },
  { title: "BPV", field: "basePerformanceValue", type: "numeric", format: (value) => value.toFixed(0) },
];
const columnsPitchingStats = [
  { title: "", field: "statsType" },
  { title: "W", field: "wins", type: "numeric" },
  { title: "L", field: "losses", type: "numeric" },
  { title: "QS", field: "qualityStarts", type: "numeric" },
  { title: "SV", field: "saves", type: "numeric" },
  { title: "BS", field: "blownSaves", type: "numeric" },
  { title: "HLD", field: "holds", type: "numeric" },
  { title: "IP", field: "inningsPitched", type: "numeric", format: (value) => value.toFixed(1) },
  { title: "HA", field: "hitsAllowed", type: "numeric" },
  { title: "ER", field: "earnedRuns", type: "numeric" },
  { title: "HRA", field: "homeRunsAllowed", type: "numeric" },
  { title: "BBA", field: "baseOnBallsAllowed", type: "numeric" },
  { title: "K", field: "strikeOuts", type: "numeric" },
  { title: "ERA", field: "earnedRunAverage", type: "numeric", format: (value) => value.toFixed(2) },
  { title: "WHIP", field: "walksAndHitsPerInningPitched", type: "numeric", format: (value) => value.toFixed(2) },
  { title: "BABIP", field: "battingAverageOnBallsInPlay", type: "numeric", format: (value) => value.toFixed(3) },
  { title: "SR", field: "strandRate", type: "numeric", format: (value) => value.toFixed(2) },
  { title: "CMD", field: "command", type: "numeric", format: (value) => value.toFixed(2) },
  { title: "DOM", field: "dominance", type: "numeric", format: (value) => value.toFixed(2) },
  { title: "CON", field: "control", type: "numeric", format: (value) => value.toFixed(2) },
  { title: "GB/FB", field: "groundBallToFlyBallRate", type: "numeric", format: (value) => value.toFixed(2) },
  { title: "BPV", field: "basePerformanceValue", type: "numeric", format: (value) => value.toFixed(0) },
];

const getChildRows = (player) => (player.type === 1 ? player.battingStats : player.pitchingStats);
const statsSelection = (player) => (player.type === 1 ? columnsBattingStats : columnsPitchingStats);
const updateLookupOnColumns = (field, lookup, cols) => cols.filter((column) => column.field === field).forEach((column) => (column.lookup = lookup));
const updateLookup = (field, lookup) => updateLookupOnColumns(field, lookup, columns);

/**
 * The player window which is used for admin level function against players.
 * @returns A new instance of Player.
 */
const Players = () => {
  const isMountedRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [leagusStatuses, setLeagueStatuses] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [players, setPlayers] = React.useState([]);
  const [playerStatuses, setPlayerStatuses] = React.useState([]);
  const [playerTypes, setPlayerTypes] = React.useState([]);
  const [positions, setPositions] = React.useState([]);
  const [severity, setSeverity] = React.useState("success");
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    isMountedRef.current = true;
    getLeagueStatusEnums((response) => {
      setLeagueStatuses(response);
      updateLookup("league1", response);
      updateLookup("league2", response);
    });
    getPlayerStatusEnums((response) => {
      setPlayerStatuses(response);
      updateLookup("status", response);
    });
    getPlayerTypeEnums((response) => {
      setPlayerTypes(response);
      updateLookup("type", response);
    });
    getPositions((response) => {
      setPositions(response);
      const positionMap = buildPositionDisplayMap(response);
      updateLookup("positions", positionMap);
    });
    getStatsTypeEnums((response) => {
      updateLookupOnColumns("statsType", response, columnsBattingStats);
      updateLookupOnColumns("statsType", response, columnsPitchingStats);
    });
    getTeams((response) => {
      setTeams(response);
      updateLookup("team", buildTeamDisplayMap(response));
    });
    getPlayers();
    return () => (isMountedRef.current = false);
  }, []);

  const buildEdit = (handleEditClose, editOpen, editRow) => {
    const lookups = {
      leagusStatuses: leagusStatuses,
      playerStatuses: playerStatuses,
      playerTypes: playerTypes,
      positions: positions,
      teams: teams,
    };
    return <PlayerView lookups={lookups} onClose={handleEditClose} open={editOpen} player={editRow} />;
  };
  const getPlayers = () => {
    axios
      .get(`${window.env.PLAYER_API_URL}/api/v2/player`)
      .then((response) => {
        if (isMountedRef.current) {
          setPlayers(response.data);
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
  const onRowUpdate = (newData) => {
    if (!newData) return;
    updatePlayer(newData.id, newData);
    const dataUpdate = players.map((p) => (p.id === newData.id ? newData : p));
    setPlayers([...dataUpdate]);
    return dataUpdate;
  };
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
              editProps={{ buildWindow: buildEdit, handleClose: onRowUpdate }}
              values={players}
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
