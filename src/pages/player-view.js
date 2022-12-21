import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { buildPositionMap, isChildPosition } from "../funcs/position-helper";
import { buildTeamDisplay, buildTeamMap } from "../funcs/team-helper";

import CustomCard from "../components/card/custom-card";
import CustomTextField from "../components/input/custom-text-field";
import { Helmet } from "react-helmet";
import MultipleSelectTextField from "../components/input/multiple-select-text-field";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const buildDefaultSelectField = (field, label, handleOnChange, defaultValue, lookup) =>
  buildSingleSelectField(field, label, handleOnChange, defaultValue, lookup, (lookup, key) => lookup[key]);
const buildGrid = (key, title, content) => (
  <Grid item key={key} lg={3} md={6} xs={12}>
    <CustomCard title={title} content={content} />
  </Grid>
);
const buildInputField = (field, label, handleOnChange, defaultValue, type, inputProps) => (
  <CustomTextField
    fullWidth
    id={field}
    inputProps={inputProps}
    label={label}
    onChange={(event) => handleOnChange(event.target.value)}
    size="small"
    defaultValue={defaultValue}
    type={type}
    variant="filled"
  />
);
const buildNumberField = (field, label, handleOnChange, defaultValue, inputProps) =>
  buildInputField(field, label, handleOnChange, defaultValue, "number", inputProps);
const buildSingleSelectField = (field, label, handleOnChange, defaultValue, lookup, display) => (
  <CustomTextField
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
  </CustomTextField>
);
const buildTextField = (field, label, handleOnChange, defaultValue) => buildInputField(field, label, handleOnChange, defaultValue, "text");
const convertToNumber = (val) => parseInt(val, 10);
const fixPlayer = (player) => {
  player.type = convertToNumber(player.type);
  player.status = convertToNumber(player.status);
  player.league1 = convertToNumber(player.league1);
  player.league2 = convertToNumber(player.league2);
  return player;
};
const useStyles = makeStyles((theme) => ({
  box: { backgroundColor: "background.default", minHeight: "100%", paddingBottom: theme.spacing(3), paddingTop: theme.spacing(3) },
}));

/**
 * A view used for setting player values on either an existing player or on a new player object.
 * @param {object} lookups                (Required) Object that contains all of the various lookups.
 * @param {object} lookups.leagusStatuses (Required) Object that maps the league status to it's code value.
 * @param {object} lookups.playerStatuses (Required) Object that maps the player status to it's code value.
 * @param {object} lookups.playerTypes    (Required) Object that maps the player type to it's code value.
 * @param {array}  lookups.positions      (Required) Array of position objects.
 * @param {array}  lookups.team           (Required) Array of team objects.
 * @param {func}   onClose                (Required) The action to call when the view is closed.
 * @param {bool}   open                   (Required) Bool indicating if the window is currently visible.
 * @param {object} player                 (Optional) The data for the player being edited (does not need to be provided for adds).
 * @returns A new instance of the PlayerView.
 */
const PlayerView = ({ lookups, onClose, open, player }) => {
  const classes = useStyles();

  const newPlayer = player ? JSON.parse(JSON.stringify(player)) : {};
  const teamMap = buildTeamMap(lookups.teams);

  const [age, setAge] = useState(newPlayer.age ?? 0);
  const [draftedPercentage, setDraftedPercentage] = useState(newPlayer.draftedPercentage ?? 0);
  const [draftRank, setDraftRank] = useState(newPlayer.draftRank ?? 0);
  const [firstName, setFirstName] = useState(newPlayer.firstName ?? "");
  const [lastName, setLastName] = useState(newPlayer.lastName ?? "");
  const [league1, setLeague1] = useState(newPlayer.league1 ?? 0);
  const [league2, setLeague2] = useState(newPlayer.league2 ?? 0);
  const [positions, setPositions] = useState(newPlayer.positions ?? []);
  const [status, setStatus] = useState(newPlayer.status ?? 0);
  const [team, setTeam] = useState(newPlayer.team ?? lookups.teams[0]);
  const [type, setType] = useState(newPlayer.type ?? 0);
  const [positionMap, setPositionMap] = useState(buildPositionMap(lookups.positions, type) ?? {});

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
        lookups.playerTypes
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
          handleOnChange={(values) => setPositions(values.map((v) => positionMap[v]))}
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
      {buildNumberField("draftedPercentage", "Drafted %", (value) => setDraftedPercentage(value < 0 ? 0 : value > 1 ? 1 : value), draftedPercentage, {
        min: 0,
        max: 1,
        step: 0.01,
      })}
    </>
  );
  const leagueInfoContent = (
    <>
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
    newPlayer.draftedPercentage = draftedPercentage;
    newPlayer.draftRank = draftRank;
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
        <title>Player View | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Dialog fullWidth={true} maxWidth="lg" open={open}>
        <DialogTitle>
          <Typography color="textPrimary" component="span" variant="h4">
            Edit Player
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.box}>
            <Container maxWidth={false}>
              <Grid container spacing={3}>
                {buildGrid("personInfo", "Person Info", personInfoContent)}
                {buildGrid("baseballInfo", "Baseball Info", baseballInfoContent)}
                {buildGrid("leagueInfo", "League Info", leagueInfoContent)}
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
PlayerView.propTypes = {
  lookups: PropTypes.exact({
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
export default PlayerView;
