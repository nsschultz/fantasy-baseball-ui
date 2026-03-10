import type { AppDispatch, RootState } from "../../state/store";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import type { PlayerFilterKey, PlayerFilterProps, PlayerFilterType } from "../../types/implementation-types";
import { buildPositionList, buildPositionMap, isChildPosition } from "../../funcs/position-helper";
import { buildTeamDisplay, buildTeamMap } from "../../funcs/team-helper";
import { useDispatch, useSelector } from "react-redux";

import CustomCard from "../../components/card/custom-card";
import { Helmet } from "react-helmet";
import MultipleSelectTextField from "../../components/input/multiple-select-text-field";
import React from "react";
import { modifyFilter } from "../../state/slice/player-filter-slice";

const buildGrid = (key: string, title: string, content: React.ReactNode) => (
  <Grid item key={key} lg={6} xs={12}>
    <CustomCard title={title} content={content} />
  </Grid>
);
const buildMultipleSelectField = <T,>(
  displayProps: {
    disableChecker?: (menuItems: Record<string, T>, selectedValues?: string[], key?: string) => boolean;
    label: string;
    listItemBuilder: (lookup: Record<string, T>, key: string) => React.ReactNode;
    textValueBuilder: () => React.ReactNode;
  },
  field: string,
  handleOnChange: (values: string[]) => void,
  menuItems: Record<string, T>,
  selectedValues: string[]
) => (
  <MultipleSelectTextField displayProps={displayProps} field={field} handleOnChange={handleOnChange} menuItems={menuItems} selectedValues={selectedValues} />
);

export default function PlayerFilter(props: Readonly<PlayerFilterProps>) {
  const { lookups, onClose, open } = props;
  const filters = useSelector((state: RootState) => state.playerFilter.value);
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
          listItemBuilder: (lookup, key) => (lookup[key] ? lookup[key] : "[default]"),
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

  const dispatch = useDispatch<AppDispatch>();
  const handleFilterChange = <K extends PlayerFilterKey>(key: K, values: PlayerFilterType[K]) => dispatch(modifyFilter({ key: key, value: values }));

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
}
