import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography } from "@mui/material";
import type { EditablePlayer, PositionMap, Team } from "../../types/entity-types";
import { buildPositionList, buildPositionMap, isChildPosition } from "../../funcs/position-helper";
import { buildTeamDisplay, buildTeamMap } from "../../funcs/team-helper";

import CustomCard from "../../components/card/custom-card";
import { Helmet } from "react-helmet";
import MultipleSelectTextField from "../../components/input/multiple-select-text-field";
import { PlayerEditorProps } from "../../types/implementation-types";
import React from "react";
import { StyledTextField } from "../../components/styled/styled-text-field";

const samplePlayer: EditablePlayer = {
  age: 0,
  averageDraftPick: 9999,
  averageDraftPickMax: 9999,
  averageDraftPickMin: 9999,
  firstName: "",
  id: "00000000-0000-0000-0000-000000000000",
  lastName: "",
  league1: 0,
  league2: 0,
  mayberryMethod: 0,
  mlbAmId: 0,
  positions: [],
  reliability: 0,
  status: 0,
  team: undefined,
  type: 0,
};

const buildDefaultSelectField = (
  field: string,
  label: string,
  handleOnChange: (value: string) => void,
  defaultValue: string | number,
  lookup: Record<string, string>,
  disabled?: boolean
) =>
  buildSingleSelectField(field, label, handleOnChange, defaultValue, lookup, (itemLookup, key) => (itemLookup[key] ? itemLookup[key] : "[default]"), disabled);
const buildGrid = (key: string, title: string, content: React.ReactNode) => (
  <Grid item key={key} lg={3} md={6} xs={12}>
    <CustomCard title={title} content={content} />
  </Grid>
);
const buildInputField = (
  field: string,
  label: string,
  handleOnChange: (value: string) => void,
  defaultValue: string | number,
  type: "number" | "text",
  inputProps?: Record<string, number>,
  disabled?: boolean
) => (
  <StyledTextField
    disabled={disabled}
    fullWidth
    id={field}
    InputProps={inputProps}
    inputProps={inputProps}
    label={label}
    onChange={(event) => handleOnChange(event.target.value)}
    size="small"
    defaultValue={defaultValue}
    type={type}
    variant="filled"
  />
);
const buildNumberField = (
  field: string,
  label: string,
  handleOnChange: (value: string) => void,
  defaultValue: string | number,
  inputProps?: Record<string, number>,
  disabled?: boolean
) => buildInputField(field, label, handleOnChange, defaultValue, "number", inputProps, disabled);
const buildSingleSelectField = (
  field: string,
  label: string,
  handleOnChange: (value: string) => void,
  defaultValue: string | number,
  lookup: Record<string, string>,
  display: (lookup: Record<string, string>, key: string) => React.ReactNode,
  disabled?: boolean
) => (
  <StyledTextField
    disabled={disabled}
    fullWidth
    id={field}
    label={label}
    onChange={(event) => handleOnChange(event.target.value)}
    select
    size="small"
    value={defaultValue}
    variant="filled"
  >
    {Object.keys(lookup).map((key) => (
      <MenuItem key={key} value={key}>
        {display(lookup, key)}
      </MenuItem>
    ))}
  </StyledTextField>
);
const buildTeamSelectField = (
  field: string,
  label: string,
  handleOnChange: (value: string) => void,
  defaultValue: string | number,
  lookup: Record<string, Team>,
  display: (lookup: Record<string, Team>, key: string) => React.ReactNode,
  disabled?: boolean
) =>
  buildSingleSelectField(
    field,
    label,
    handleOnChange,
    defaultValue,
    lookup as unknown as Record<string, string>,
    (_lookup, key) => display(lookup, key),
    disabled
  );
const buildTextField = (field: string, label: string, handleOnChange: (value: string) => void, defaultValue: string) =>
  buildInputField(field, label, handleOnChange, defaultValue, "text");
const convertToNumber = (val: string | number) => Number.parseInt(String(val), 10);
const clampNumber = (val: string, min: number, max: number) => Math.min(max, Math.max(min, Number.parseFloat(val || "0")));
const ensureStringArray = (values: string[] | string): string[] => (Array.isArray(values) ? values : [values]);
const fixPlayer = (player: EditablePlayer): EditablePlayer => {
  player.age = convertToNumber(player.age);
  player.mlbAmId = convertToNumber(player.mlbAmId);
  player.averageDraftPick = convertToNumber(player.averageDraftPick * 100) / 100;
  player.averageDraftPickMin = convertToNumber(player.averageDraftPickMin);
  player.averageDraftPickMax = convertToNumber(player.averageDraftPickMax);
  player.league1 = convertToNumber(player.league1);
  player.league2 = convertToNumber(player.league2);
  player.status = convertToNumber(player.status);
  player.type = convertToNumber(player.type);
  return player;
};

export default function PlayerEditor(props: Readonly<PlayerEditorProps>) {
  const { lookups, onClose, open, player } = props;
  const newPlayer: EditablePlayer = structuredClone(player || samplePlayer);
  const [age, setAge] = React.useState(newPlayer.age);
  const [averageDraftPick, setAverageDraftPick] = React.useState(Number(newPlayer.averageDraftPick.toFixed(2)));
  const [averageDraftPickMin, setAverageDraftPickMin] = React.useState(newPlayer.averageDraftPickMin);
  const [averageDraftPickMax, setAverageDraftPickMax] = React.useState(newPlayer.averageDraftPickMax);
  const [firstName, setFirstName] = React.useState(newPlayer.firstName);
  const isEdit = Boolean(player);
  const [lastName, setLastName] = React.useState(newPlayer.lastName);
  const [league1, setLeague1] = React.useState(newPlayer.league1);
  const [mlbAmId, setMlbAmId] = React.useState(newPlayer.mlbAmId);
  const [league2, setLeague2] = React.useState(newPlayer.league2);
  const [positions, setPositions] = React.useState(newPlayer.positions);
  const [status, setStatus] = React.useState(newPlayer.status);
  const [team, setTeam] = React.useState<Team>(newPlayer.team || lookups.teams[0]);
  const teamMap = buildTeamMap(lookups.teams);
  const [type, setType] = React.useState<string | number>(newPlayer.type);
  const [positionMap, setPositionMap] = React.useState<PositionMap>(buildPositionMap(lookups.positions, type));
  const baseballInfoContent = (
    <>
      {buildDefaultSelectField(
        "type",
        "Type",
        (value) => {
          setType(value);
          setPositions([]);
          setPositionMap(buildPositionMap(lookups.positions, value));
        },
        type,
        lookups.playerTypes,
        isEdit
      )}
      {
        <MultipleSelectTextField
          displayProps={{
            disableChecker: isChildPosition,
            label: "Position(s)",
            listItemBuilder: (lookup, key) => lookup[key].fullName,
            textValueBuilder: () => positions.map((p) => p.code).join(),
          }}
          field="positions"
          handleOnChange={(values) => setPositions(buildPositionList(ensureStringArray(values), positionMap))}
          menuItems={positionMap}
          selectedValues={positions.map((p) => p.code)}
        />
      }
      {buildTeamSelectField(
        "team",
        "Team",
        (value) => setTeam(teamMap[value]),
        team.code,
        teamMap,
        (lookup, key) => buildTeamDisplay(lookup[key])
      )}
      {buildDefaultSelectField("status", "Status", (value) => setStatus(convertToNumber(value)), status, lookups.playerStatuses)}
    </>
  );
  const draftInfoContent = (
    <>
      {buildNumberField("averageDraftPick", "ADP", (value) => setAverageDraftPick(clampNumber(value, 1, 9999)), averageDraftPick)}
      {buildNumberField("averageDraftPickMin", "ADP Min", (value) => setAverageDraftPickMin(clampNumber(value, 1, 9999)), averageDraftPickMin)}
      {buildNumberField("averageDraftPickMax", "ADP Max", (value) => setAverageDraftPickMax(clampNumber(value, 1, 9999)), averageDraftPickMax)}
    </>
  );
  const fantasyInfoContent = (
    <>
      {buildNumberField("mlbAmId", "MLBAMID", (value) => setMlbAmId(Math.max(0, convertToNumber(value))), mlbAmId, { min: 0 }, isEdit)}
      {buildDefaultSelectField("league1", "League #1 Status", (value) => setLeague1(convertToNumber(value)), league1, lookups.leagueStatuses)}
      {buildDefaultSelectField("league2", "League #2 Status", (value) => setLeague2(convertToNumber(value)), league2, lookups.leagueStatuses)}
    </>
  );
  const personInfoContent = (
    <>
      {buildTextField("firstName", "First Name", (value) => setFirstName(value), firstName)}
      {buildTextField("lastName", "Last Name", (value) => setLastName(value), lastName)}
      {buildNumberField("age", "Age", (value) => setAge(Math.max(0, convertToNumber(value))), age, { min: 0 })}
    </>
  );

  const handleCancel = () => onClose();
  const handleSave = () => {
    newPlayer.age = age;
    newPlayer.mlbAmId = mlbAmId;
    newPlayer.averageDraftPick = averageDraftPick;
    newPlayer.averageDraftPickMin = averageDraftPickMin;
    newPlayer.averageDraftPickMax = averageDraftPickMax;
    newPlayer.name = `${firstName} ${lastName}`;
    newPlayer.firstName = firstName;
    newPlayer.lastName = lastName;
    newPlayer.league1 = league1;
    newPlayer.league2 = league2;
    newPlayer.positions = positions;
    newPlayer.status = status;
    newPlayer.team = team;
    newPlayer.type = convertToNumber(type);
    onClose(fixPlayer(newPlayer));
  };

  return (
    <>
      <Helmet>
        <title>Player Editor | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Dialog fullWidth={true} maxWidth="lg" open={open}>
        <DialogTitle>
          <Typography color="textPrimary" component="span" variant="h4">
            {`${isEdit ? "Edit" : "Add"} Player`}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ minHeight: "100%" }}>
            <Container maxWidth={false}>
              <Grid container spacing={3}>
                {buildGrid("personInfo", "Person Info", personInfoContent)}
                {buildGrid("baseballInfo", "Baseball Info", baseballInfoContent)}
                {buildGrid("fantasyInfo", "Fantasy Info", fantasyInfoContent)}
                {buildGrid("draftInfo", "Draft Info", draftInfoContent)}
              </Grid>
            </Container>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleSave} variant="contained" component="label">
            Save
          </Button>
          <Button color="secondary" onClick={handleCancel} variant="contained" component="label">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
