import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { buildPositionList, buildPositionMap, isChildPosition } from "../funcs/position-helper";
import { buildTeamDisplay, buildTeamMap } from "../funcs/team-helper";
import { useDispatch, useSelector } from "react-redux";

import CustomCard from "../components/card/custom-card";
import { Helmet } from "react-helmet";
import MultipleSelectTextField from "../components/input/multiple-select-text-field";
import PropTypes from "prop-types";
import React from "react";
import { modifyFilter } from "../state/slice/player-filter-slice";

const buildGrid = (key, title, content) => (
  <Grid item key={key} lg={6} xs={12}>
    <CustomCard title={title} content={content} />
  </Grid>
);
const buildMultipleSelectField = (displayProps, field, handleOnChange, menuItems, selectedValues) => (
  <MultipleSelectTextField displayProps={displayProps} field={field} handleOnChange={handleOnChange} menuItems={menuItems} selectedValues={selectedValues} />
);

/**
 * A view used for setting player values on either an existing player or on a new player object.
 * @param {object} lookups.leagusStatuses Object that maps the league status to it's code value.
 * @param {object} lookups.playerStatuses Object that maps the player status to it's code value.
 * @param {object} lookups.playerTypes    Object that maps the player type to it's code value.
 * @param {array}  lookups.positions      Array of position objects.
 * @param {array}  lookups.team           Array of team objects.
 * @param {func}   onClose                The action to call when the view is closed.
 * @param {bool}   open                   Bool indicating if the window is currently visible.
 * @returns A new instance of the PlayerView.
 */
const PlayerFilter = ({ lookups, onClose, open }) => {
  const filters = useSelector((state) => state.playerFilter.value);
  const positionMap = buildPositionMap(lookups.positions);
  const teamMap = buildTeamMap(lookups.teams);
  const baseballInfoContent = (
    <>
      {buildMultipleSelectField(
        {
          label: "Type(s)",
          listItemBuilder: (lookup, key) => lookup[key],
          textValueBuilder: () => filters.types.map((t) => lookups.playerTypes[t]).join(),
        },
        "types",
        (values) => handleFilterChange("types", values),
        lookups.playerTypes,
        filters.types
      )}
      {buildMultipleSelectField(
        {
          disableChecker: isChildPosition,
          label: "Position(s)",
          listItemBuilder: (lookup, key) => lookup[key].fullName,
          textValueBuilder: () => filters.positions.map((p) => p.code).join(),
        },
        "positions",
        (values) => handleFilterChange("positions", buildPositionList(values, positionMap)),
        positionMap,
        filters.positions.map((p) => p.code)
      )}
      {buildMultipleSelectField(
        {
          label: "Team(s)",
          listItemBuilder: (lookup, key) => buildTeamDisplay(lookup[key]),
          textValueBuilder: () => filters.teams.map((t) => t.code).join(),
        },
        "teams",
        (values) =>
          handleFilterChange(
            "teams",
            values.map((v) => teamMap[v])
          ),
        teamMap,
        filters.teams.map((t) => t.code)
      )}
      {buildMultipleSelectField(
        {
          label: "Status(es)",
          listItemBuilder: (lookup, key) => lookup[key],
          textValueBuilder: () => filters.statuses.map((t) => lookups.playerStatuses[t]).join(),
        },
        "statuses",
        (values) => handleFilterChange("statuses", values),
        lookups.playerStatuses,
        filters.statuses
      )}
    </>
  );
  const leagueInfoContent = (
    <>
      {buildMultipleSelectField(
        {
          label: "League #1 Status(es)",
          listItemBuilder: (lookup, key) => lookup[key],
          textValueBuilder: () => filters.l1statuses.map((t) => lookups.leagusStatuses[t]).join(),
        },
        "l1statuses",
        (values) => handleFilterChange("l1statuses", values),
        lookups.leagusStatuses,
        filters.l1statuses
      )}
      {buildMultipleSelectField(
        {
          label: "League #2 Status(es)",
          listItemBuilder: (lookup, key) => lookup[key],
          textValueBuilder: () => filters.l2statuses.map((t) => lookups.leagusStatuses[t]).join(),
        },
        "l2statuses",
        (values) => handleFilterChange("l2statuses", values),
        lookups.leagusStatuses,
        filters.l2statuses
      )}
    </>
  );

  const dispatch = useDispatch();
  const handleFilterChange = (key, values) => dispatch(modifyFilter({ key: key, value: values }));

  return (
    <>
      <Helmet>
        <title>Player Filters | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Dialog fullWidth={true} maxWidth="lg" open={open}>
        <DialogTitle>
          <Typography color="textPrimary" component="span" variant="h4">
            Filter Players
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ minHeight: "100%" }}>
            <Container maxWidth={false}>
              <Grid container spacing={3}>
                {buildGrid("baseballInfo", "Baseball Info", baseballInfoContent)}
                {buildGrid("leagueInfo", "League Info", leagueInfoContent)}
              </Grid>
            </Container>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose} variant="contained" component="label">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
PlayerFilter.propTypes = {
  lookups: PropTypes.exact({
    leagusStatuses: PropTypes.object.isRequired,
    playerStatuses: PropTypes.object.isRequired,
    playerTypes: PropTypes.object.isRequired,
    positions: PropTypes.array.isRequired,
    teams: PropTypes.array.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default PlayerFilter;
