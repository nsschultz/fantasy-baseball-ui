import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, MenuItem, Typography } from "@mui/material";
import { buildPositionList, buildPositionMap, isChildPosition } from "../funcs/position-helper";
import { buildTeamDisplay, buildTeamMap } from "../funcs/team-helper";

import CustomCard from "../components/card/custom-card";
import { Helmet } from "react-helmet";
import MultipleSelectTextField from "../components/input/multiple-select-text-field";
import PropTypes from "prop-types";
import React from "react";
import { StyledTextField } from "../components/styled/styled-text-field";

const samplePlayer = {
  age: 0,
  mlbAmId: 0,
  draftedPercentage: 0,
  draftRank: 9999,
  firstName: "",
  lastName: "",
  league1: 0,
  league2: 0,
  positions: [],
  status: 0,
  team: undefined,
  type: 0,
};

const buildDefaultSelectField = (field, label, handleOnChange, defaultValue, lookup, disabled) =>
  buildSingleSelectField(field, label, handleOnChange, defaultValue, lookup, (lookup, key) => (lookup[key] ? lookup[key] : "[default]"), disabled);
const buildGrid = (key, title, content) => (
  <Grid item key={key} lg={3} md={6} xs={12}>
    <CustomCard title={title} content={content} />
  </Grid>
);
const buildInputField = (field, label, handleOnChange, defaultValue, type, inputProps, disabled) => (
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
const buildNumberField = (field, label, handleOnChange, defaultValue, inputProps, disabled) =>
  buildInputField(field, label, handleOnChange, defaultValue, "number", inputProps, disabled);
const buildSingleSelectField = (field, label, handleOnChange, defaultValue, lookup, display, disabled) => (
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
const buildTextField = (field, label, handleOnChange, defaultValue) => buildInputField(field, label, handleOnChange, defaultValue, "text");
const convertToNumber = (val) => parseInt(val, 10);
const fixPlayer = (player) => {
  player.age = convertToNumber(player.age);
  player.mlbAmId = convertToNumber(player.mlbAmId);
  player.draftedPercentage = convertToNumber(player.draftedPercentage) / 100;
  player.draftRank = convertToNumber(player.draftRank);
  player.league1 = convertToNumber(player.league1);
  player.league2 = convertToNumber(player.league2);
  player.status = convertToNumber(player.status);
  player.type = convertToNumber(player.type);
  return player;
};

/**
 * A view used for setting player values on either an existing player or on a new player object.
 * @param {object} lookups.leagusStatuses Object that maps the league status to it's code value.
 * @param {object} lookups.playerStatuses Object that maps the player status to it's code value.
 * @param {object} lookups.playerTypes    Object that maps the player type to it's code value.
 * @param {array}  lookups.positions      Array of position objects.
 * @param {array}  lookups.team           Array of team objects.
 * @param {func}   onClose                The action to call when the view is closed.
 * @param {bool}   open                   Bool indicating if the window is currently visible.
 * @param {object} player                 The data for the player being edited (does not need to be provided for adds).
 * @returns A new instance of the PlayerView.
 */
const PlayerEditor = ({ lookups, onClose, open, player }) => {
  const newPlayer = JSON.parse(JSON.stringify(player || samplePlayer));
  const [age, setAge] = React.useState(newPlayer.age);
  const [draftedPercentage, setDraftedPercentage] = React.useState((newPlayer.draftedPercentage * 100).toFixed(0));
  const [draftRank, setDraftRank] = React.useState(newPlayer.draftRank);
  const [firstName, setFirstName] = React.useState(newPlayer.firstName);
  const isEdit = newPlayer.id !== undefined;
  const [lastName, setLastName] = React.useState(newPlayer.lastName);
  const [league1, setLeague1] = React.useState(newPlayer.league1);
  const [mlbAmId, setMlbAmId] = React.useState(newPlayer.mlbAmId);
  const [league2, setLeague2] = React.useState(newPlayer.league2);
  const [positions, setPositions] = React.useState(newPlayer.positions);
  const [status, setStatus] = React.useState(newPlayer.status);
  const [team, setTeam] = React.useState(newPlayer.team || lookups.teams[0]);
  const teamMap = buildTeamMap(lookups.teams);
  const [type, setType] = React.useState(newPlayer.type);
  const [positionMap, setPositionMap] = React.useState(buildPositionMap(lookups.positions, type));
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
          handleOnChange={(values) => setPositions(buildPositionList(values, positionMap))}
          menuItems={positionMap}
          selectedValues={positions.map((p) => p.code)}
        />
      }
      {buildSingleSelectField(
        "team",
        "Team",
        (value) => setTeam(teamMap[value]),
        team.code,
        teamMap,
        (lookup, key) => buildTeamDisplay(lookup[key])
      )}
      {buildDefaultSelectField("status", "Status", (value) => setStatus(value), status, lookups.playerStatuses)}
    </>
  );
  const draftInfoContent = (
    <>
      {buildNumberField("draftRank", "Draft Rank", (value) => setDraftRank(value < 1 ? 1 : value > 9999 ? 9999 : value), draftRank, { min: 1, max: 9999 })}
      {buildNumberField("draftedPercentage", "Drafted %", (value) => setDraftedPercentage(value < 0 ? 0 : value > 100 ? 100 : value), draftedPercentage, {
        endadornment: <InputAdornment position="end">%</InputAdornment>,
        min: 0,
        max: 100,
      })}
    </>
  );
  const fantasyInfoContent = (
    <>
      {buildNumberField("mlbAmId", "MLBAMID", (value) => setMlbAmId(value < 0 ? 0 : value), mlbAmId, { min: 0 }, isEdit)}
      {buildDefaultSelectField("league1", "League #1 Status", (value) => setLeague1(value), league1, lookups.leagusStatuses)}
      {buildDefaultSelectField("league2", "League #2 Status", (value) => setLeague2(value), league2, lookups.leagusStatuses)}
    </>
  );
  const personInfoContent = (
    <>
      {buildTextField("firstName", "First Name", (value) => setFirstName(value), firstName)}
      {buildTextField("lastName", "Last Name", (value) => setLastName(value), lastName)}
      {buildNumberField("age", "Age", (value) => setAge(value < 0 ? 0 : value), age, { min: 0 })}
    </>
  );

  const handleCancel = () => onClose();
  const handleSave = () => {
    newPlayer.age = age;
    newPlayer.mlbAmId = mlbAmId;
    newPlayer.draftedPercentage = draftedPercentage;
    newPlayer.draftRank = draftRank;
    newPlayer.name = `${firstName} ${lastName}`;
    newPlayer.firstName = firstName;
    newPlayer.lastName = lastName;
    newPlayer.league1 = league1;
    newPlayer.league2 = league2;
    newPlayer.positions = positions;
    newPlayer.status = status;
    newPlayer.team = team;
    newPlayer.type = type;
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
};
PlayerEditor.propTypes = {
  lookups: PropTypes.shape({
    leagusStatuses: PropTypes.object.isRequired,
    playerStatuses: PropTypes.object.isRequired,
    playerTypes: PropTypes.object.isRequired,
    positions: PropTypes.array.isRequired,
    teams: PropTypes.array.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  player: PropTypes.object,
};
export default PlayerEditor;
