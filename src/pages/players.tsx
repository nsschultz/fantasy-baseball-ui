import type { AppDispatch, RootState } from "../state/store";
import { Box, Container, Snackbar, Typography } from "@mui/material";
import type { Player, Position, Team } from "../types/entity-types";
import { getLeagueStatusEnums, getPlayerStatusEnums, getPlayerTypeEnums, getPositions, getStatsTypeEnums, getTeams } from "../funcs/get-lookups";
import { playerDefaultComparator, playerNameComparator, playerPositionsComparator, playerTeamComparator } from "../funcs/sort-comparators";
import { useDispatch, useSelector } from "react-redux";

import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";
import { EnumLookup } from "../types/basic-types";
import { Helmet } from "react-helmet";
import ParentTable from "../components/table/parent-table";
import PlayerDeleter from "./dialogs/player-deleter";
import PlayerEditor from "./dialogs/player-editor";
import PlayerFilter from "./dialogs/player-filter";
import React from "react";
import axios from "axios";
import { matchAnyPosition } from "../funcs/position-helper";
import { modifyFilter } from "../state/slice/player-filter-slice";

const convertToNumber = (val: string) => Number.parseInt(val, 10);

export default function Players() {
  const isMountedRef = React.useRef(false);
  const filters = useSelector((state: RootState) => state.playerFilter.value);
  const [filteredPlayers, setFilteredPlayers] = React.useState<Player[]>([]);
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [leagueStatuses, setLeagueStatuses] = React.useState<EnumLookup>({});
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [playerStatuses, setPlayerStatuses] = React.useState<EnumLookup>({});
  const [playerTypes, setPlayerTypes] = React.useState<EnumLookup>({});
  const [positions, setPositions] = React.useState<Position[]>([]);
  const [statsType, setStatsType] = React.useState<EnumLookup>({});
  const [severity, setSeverity] = React.useState<AlertColor>("success");
  const [teams, setTeams] = React.useState<Team[]>([]);
  const columns = [
    { align: "right", field: "mlbAmId", title: "MLBAMID" },
    { field: "name", sortComparator: playerNameComparator, title: "Name" },
    { align: "right", field: "age", title: "Age" },
    { field: "type", format: (value: number) => playerTypes[value], title: "Type" },
    {
      field: "positions",
      format: (value: Position[]) => value.map((p: Position) => p.code).join(),
      sortComparator: playerPositionsComparator,
      title: "Position(s)",
    },
    { field: "team", format: (value: Team) => value.code, sortComparator: playerTeamComparator, title: "Team" },
    { field: "status", format: (value: number) => playerStatuses[value], title: "Status" },
    { field: "league1", format: (value: number) => leagueStatuses[value], title: "League #1 Status" },
    { field: "league2", format: (value: number) => leagueStatuses[value], title: "League #2 Status" },
    { align: "right", field: "averageDraftPick", format: (value: number) => value.toFixed(2), title: "ADP" },
  ] as const;
  const columnsBattingStats = [
    { field: "statsType", format: (value: number) => statsType[value], title: "" },
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
    { align: "right", field: "battingAverage", format: (value: number) => value.toFixed(3), title: "BA" },
    { align: "right", field: "onBasePercentage", format: (value: number) => value.toFixed(3), title: "OB" },
    { align: "right", field: "sluggingPercentage", format: (value: number) => value.toFixed(3), title: "SLG" },
    { align: "right", field: "onBasePlusSlugging", format: (value: number) => value.toFixed(3), title: "OPS" },
    { align: "right", field: "contractRate", format: (value: number) => value.toFixed(2), title: "CT%" },
    { align: "right", field: "power", format: (value: number) => value.toFixed(0), title: "PX" },
    { align: "right", field: "walkRate", format: (value: number) => value.toFixed(2), title: "BB%" },
    { align: "right", field: "speed", format: (value: number) => value.toFixed(0), title: "SPD" },
    { align: "right", field: "basePerformanceValue", format: (value: number) => value.toFixed(0), title: "BPV" },
  ] as const;
  const columnsPitchingStats = [
    { field: "statsType", format: (value: number) => statsType[value], title: "" },
    { align: "right", field: "wins", title: "W" },
    { align: "right", field: "losses", title: "L" },
    { align: "right", field: "qualityStarts", title: "QS" },
    { align: "right", field: "saves", title: "SV" },
    { align: "right", field: "blownSaves", title: "BS" },
    { align: "right", field: "holds", title: "HLD" },
    { align: "right", field: "inningsPitched", format: (value: number) => value.toFixed(1), title: "IP" },
    { align: "right", field: "hitsAllowed", title: "HA" },
    { align: "right", field: "earnedRuns", title: "ER" },
    { align: "right", field: "homeRunsAllowed", title: "HRA" },
    { align: "right", field: "baseOnBallsAllowed", title: "BBA" },
    { align: "right", field: "strikeOuts", title: "K" },
    { align: "right", field: "earnedRunAverage", format: (value: number) => value.toFixed(2), title: "ERA" },
    { align: "right", field: "walksAndHitsPerInningPitched", format: (value: number) => value.toFixed(2), title: "WHIP" },
    { align: "right", field: "battingAverageOnBallsInPlay", format: (value: number) => value.toFixed(3), title: "BABIP" },
    { align: "right", field: "strandRate", format: (value: number) => value.toFixed(2), title: "SR" },
    { align: "right", field: "command", format: (value: number) => value.toFixed(2), title: "CMD" },
    { align: "right", field: "dominance", format: (value: number) => value.toFixed(2), title: "DOM" },
    { align: "right", field: "control", format: (value: number) => value.toFixed(2), title: "CON" },
    { align: "right", field: "groundBallToFlyBallRate", format: (value: number) => value.toFixed(2), title: "GB/FB" },
    { align: "right", field: "basePerformanceValue", format: (value: number) => value.toFixed(0), title: "BPV" },
  ] as const;

  React.useEffect(() => {
    isMountedRef.current = true;
    getLeagueStatusEnums((response) => setLeagueStatuses(response));
    getPlayerStatusEnums((response) => setPlayerStatuses(response));
    getPlayerTypeEnums((response) => setPlayerTypes(response));
    getPositions((response) => setPositions(response));
    getStatsTypeEnums((response) => setStatsType(response));
    getTeams((response) => setTeams(response));
    getPlayers();
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  React.useEffect(() => {
    onHandleFilterChange();
  }, [filters, players]);

  const addPlayer = (player: Player, onClose: (player?: Player) => void) => {
    axios
      .post(`${globalThis.env.PLAYER_API_URL}/api/v3/player`, player)
      .then((response) => {
        onClose();
        axios
          .get(`${globalThis.env.PLAYER_API_URL}/api/v3/player/${response.data}`)
          .then((response) => {
            response.data.name = `${response.data.firstName} ${response.data.lastName}`;
            setPlayers((currentPlayers) => [...currentPlayers, response.data]);
            setSeverity("success");
            setMessage(`Successfully added ${player.name}`);
            setOpen(true);
          })
          .catch(() => {
            setSeverity("error");
            setMessage(`Successfully added but unable to retrieve ${player.name}`);
            setOpen(true);
            setIsLoading(false);
          });
      })
      .catch(() => {
        setSeverity("error");
        setMessage(`Unable to add ${player.name}`);
        setOpen(true);
      });
  };
  const buildDelete = (handleDeleteClose: (player?: Player) => void, deleteOpen: boolean, deleteRow?: Player) => (
    <PlayerDeleter onClose={handleDeleteClose} open={deleteOpen} player={deleteRow} />
  );
  const buildEdit = (handleEditClose: (player?: Player) => void, editOpen: boolean, editRow?: Player) => (
    <PlayerEditor lookups={buildLookups()} onClose={handleEditClose} open={editOpen} player={editRow} />
  );
  const buildFilter = (handleFilterClose: () => void, filterOpen: boolean) => (
    <PlayerFilter lookups={buildLookups()} onClose={handleFilterClose} open={filterOpen} />
  );
  const buildLookups = () => {
    return {
      leagusStatuses: leagueStatuses,
      playerStatuses: playerStatuses,
      playerTypes: playerTypes,
      positions: positions,
      teams: teams,
    };
  };
  const deletePlayer = (player: Player, onClose: () => void) => {
    axios
      .delete(`${globalThis.env.PLAYER_API_URL}/api/v3/player/${player.id}`)
      .then(() => {
        const dataUpdate = players.filter((p) => p.id !== player.id);
        setPlayers([...dataUpdate]);
        setSeverity("success");
        setMessage(`Successfully deleted ${player.name}`);
        setOpen(true);
        onClose();
      })
      .catch(() => {
        setSeverity("error");
        setMessage(`Unable to delete ${player.name}`);
        setOpen(true);
      });
  };
  const dispatch = useDispatch<AppDispatch>();
  const getChildRows = (player: Player) => (player.type === 1 ? player.battingStats : player.pitchingStats);
  const getPlayers = () => {
    axios
      .get(`${globalThis.env.PLAYER_API_URL}/api/v3/player`)
      .then((response) => {
        if (isMountedRef.current) {
          const loadedPlayers = (response.data as Player[]).map((p) => ({ ...p, name: `${p.firstName} ${p.lastName}` }));
          setPlayers(loadedPlayers);
          setFilteredPlayers(loadedPlayers);
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
    const actions: Array<(player: Player) => boolean> = [];
    if (filters.name) actions.push((player) => player.name.toLowerCase().includes(filters.name.toLowerCase()));
    if (filters.positions.length > 0) actions.push((player) => filters.positions.map((p) => p.code).some((v) => matchAnyPosition(player.positions, v, true)));
    if (filters.l1statuses.length > 0) actions.push((player) => filters.l1statuses.some((v) => convertToNumber(v) === player.league1));
    if (filters.l2statuses.length > 0) actions.push((player) => filters.l2statuses.some((v) => convertToNumber(v) === player.league2));
    if (filters.statuses.length > 0) actions.push((player) => filters.statuses.some((v) => convertToNumber(v) === player.status));
    if (filters.teams.length > 0) actions.push((player) => filters.teams.some((v) => v.code === player.team.code));
    if (filters.types.length > 0) actions.push((player) => filters.types.some((v) => convertToNumber(v) === player.type));
    setIsFiltered(actions.length > 1 || (actions.length === 1 && !filters.name));
    setFilteredPlayers(actions.length === 0 ? players : players.filter((player) => actions.length === actions.filter((filter) => filter(player)).length));
  };
  const onRowAdd = (player?: Player, onClose?: (player?: Player) => void) => {
    if (player && onClose) addPlayer(player, onClose);
    else onClose?.();
  };
  const onRowDelete = (player?: Player, onClose?: () => void) => {
    if (player && onClose) deletePlayer(player, onClose);
    else onClose?.();
  };
  const onRowUpdate = (player?: Player, onClose?: (player?: Player) => void) => {
    if (player && onClose) updatePlayer(player, onClose);
    else onClose?.();
  };
  const searchbarChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(modifyFilter({ key: "name", value: event.target.value || "" }));
  const statsSelection = (player: Player) => (player.type === 1 ? columnsBattingStats : columnsPitchingStats);
  const updatePlayer = (player: Player, onClose: (player?: Player) => void) => {
    axios
      .put(`${globalThis.env.PLAYER_API_URL}/api/v3/player/${player.id}`, player)
      .then(() => {
        const dataUpdate = players.map((p) => (p.id === player.id ? player : p));
        setPlayers([...dataUpdate]);
        setSeverity("success");
        setMessage(`Successfully updated ${player.name}`);
        setOpen(true);
        onClose();
      })
      .catch(() => {
        setSeverity("error");
        setMessage(`Unable to update ${player.name}`);
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
            <ParentTable<Player>
              childProps={
                {
                  columnSelector: statsSelection,
                  description: "Player's Stats",
                  rowKeyBuilder: (row) => row.statsType,
                  rowSelector: getChildRows,
                  title: "Season Stats",
                } as unknown as never
              }
              columns={columns as unknown as never}
              deleteProps={{ buildDialog: buildDelete, handleClose: onRowDelete }}
              description="Player"
              editProps={{ buildDialog: buildEdit, handleClose: onRowUpdate }}
              sortComparator={playerDefaultComparator}
              toolbarProps={{
                addProps: { buildDialog: buildEdit, handleClose: onRowAdd },
                description: "Player",
                filterProps: { buildDialog: buildFilter, handleClose: onHandleFilterChange, isFiltered: isFiltered },
                searchProps: { handleSearch: searchbarChangeHandler, initialValue: filters.name, placeholder: "Search Player by Name" },
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
}
