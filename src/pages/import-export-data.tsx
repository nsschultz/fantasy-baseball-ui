import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Grid, MenuItem, Snackbar } from "@mui/material";
import type { EnumLookup, NotificationMessage } from "../types/basic-types";
import { getPlayerTypeEnums, getStatsTypeEnums } from "../funcs/get-lookups";

import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";
import type { AppDispatch } from "../state/store";
import FileSaver from "file-saver";
import { Helmet } from "react-helmet";
import IntegrationCard from "../components/card/integration-card";
import React from "react";
import { StyledTextField } from "../components/styled/styled-text-field";
import { addNotification } from "../state/slice/notification-slice";
import axios from "axios";
import { useDispatch } from "react-redux";

const buildDefaultSelectField = (field: string, label: string, handleOnChange: (value: string) => void, defaultValue: string | number, lookup: EnumLookup) =>
  buildSingleSelectField(field, label, handleOnChange, defaultValue, lookup, (itemLookup, key) => (itemLookup[key] ? itemLookup[key] : "[default]"));
const buildSingleSelectField = (
  key: string,
  label: string,
  handleOnChange: (value: string) => void,
  defaultValue: string | number,
  lookup: EnumLookup,
  display: (lookup: EnumLookup, key: string) => React.ReactNode
) => (
  <StyledTextField
    fullWidth
    id={key}
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

export default function ImportExportData() {
  const [alertProps, setAlertProps] = React.useState<{ message: string; severity: AlertColor }>({ message: "", severity: "info" });
  const [isClearDialogOpen, setIsClearDialogOpen] = React.useState<boolean>(false);
  const [isPlayerUploadDialogOpen, setIsPlayerUploadDialogOpen] = React.useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState<boolean>(false);
  const [playerType, setPlayerType] = React.useState<string>("0");
  const [playerTypes, setPlayerTypes] = React.useState<EnumLookup>({});
  const [statsType, setStatsType] = React.useState<string>("0");
  const [statsTypes, setStatsTypes] = React.useState<EnumLookup>({});

  React.useEffect(() => {
    getPlayerTypeEnums((response) => setPlayerTypes(response));
    getStatsTypeEnums((response) => setStatsTypes(response));
  }, []);

  const crypto = globalThis.crypto || globalThis.msCrypto;
  const clearInputFile = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };
  const createNotification = (message: string, type: NotificationMessage["type"]) =>
    dispatch(addNotification({ notificationKey: crypto.getRandomValues(new Uint32Array(1))[0], message: message, timestamp: Date.now(), type: type }));
  const dispatch = useDispatch<AppDispatch>();
  const displayErrorMessage = (message: string) => createNotification(message, "error");
  const displayInfoMessage = (message: string) => {
    createNotification(message, "info");
    setSnackbar("info", message);
  };
  const displaySuccessMessage = (message: string) => createNotification(message, "success");
  const exportOnClick = () => {
    axios
      .get(`${globalThis.env.PLAYER_API_URL}/api/v3/action/export`, { responseType: "blob" })
      .then((response) => FileSaver.saveAs(new Blob([response.data]), "players.csv"))
      .catch(() => setSnackbar("error", "Failed to export the players"));
  };
  const handleClearDialogClose = (shouldClear: boolean) => {
    setIsClearDialogOpen(false);
    if (!shouldClear) return;
    axios
      .delete(`${globalThis.env.PLAYER_API_URL}/api/v3/player`)
      .then(() => displaySuccessMessage("Successfully cleared the players."))
      .catch(() => displayErrorMessage("Failed to clear the players."));
    displayInfoMessage("Attempting to clear players");
  };
  const onFileChange = (file: File) => {
    setIsPlayerUploadDialogOpen(false);
    if (!file) return;
    const fileName = `${playerTypes[playerType]}-${statsTypes[statsType]}.csv`.split(" ").join("_").toLocaleLowerCase();
    const formData = new FormData();
    formData.append(fileName, file, file.name);
    axios
      .post(`${globalThis.env.PLAYER_API_URL}/api/v3/action/upload/stats?player=${playerType}&stats=${statsType}`, formData)
      .then(() => displaySuccessMessage(`Successfully uploaded the ${fileName} file.`))
      .catch(() => displayErrorMessage(`Failed to upload the ${fileName} file.`));
    displayInfoMessage(`Attempting to upload the ${fileName} file.`);
  };
  const onUploadFileChange = (event: React.ChangeEvent<HTMLInputElement>) => onFileChange(event.target.files?.[0]);
  const setSnackbar = (severity: AlertColor, message: string) => {
    setAlertProps({ message: message, severity: severity });
    setIsSnackbarOpen(true);
  };

  const clearPlayersButton = (
    <Button color="primary" onClick={() => setIsClearDialogOpen(true)} variant="contained">
      Clear
    </Button>
  );
  const exportPlayersButton = (
    <Button color="primary" onClick={() => exportOnClick()} variant="contained">
      Export
    </Button>
  );
  const uploadPlayersFileButton = (
    <Button color="primary" onClick={() => setIsPlayerUploadDialogOpen(true)} variant="contained">
      Upload
    </Button>
  );

  return (
    <>
      <Helmet>
        <title>Integrations | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Box sx={{ backgroundColor: "background.default", minHeight: "100%", paddingBottom: 3, paddingTop: 3 }}>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item key="uploadPlayers" lg={6} md={6} xs={12}>
              <IntegrationCard
                title="Upload Player File"
                description="Choose player and stats types and upload the latest data file."
                integrationButton={uploadPlayersFileButton}
              />
            </Grid>
            <Grid item key="exportPlayers" lg={6} md={6} xs={12}>
              <IntegrationCard title="Export Players" description="Download the latest version of the player data." integrationButton={exportPlayersButton} />
            </Grid>
            <Grid item key="clearPlayers" lg={6} md={6} xs={12}>
              <IntegrationCard title="Clear Players" description="Clear the list of players from the previous season." integrationButton={clearPlayersButton} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Dialog open={isClearDialogOpen}>
        <DialogContent>
          <DialogContentText>Are you sure you want to clear the players?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleClearDialogClose(false)} variant="contained">
            No
          </Button>
          <Button color="secondary" onClick={() => handleClearDialogClose(true)} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isPlayerUploadDialogOpen}>
        <DialogContent>
          <DialogContentText>Choose player and stats types and upload the latest data file.</DialogContentText>
          <Divider />
          <Box sx={{ padding: 2 }}>
            {buildDefaultSelectField("playerType", "Player Type", (value: string) => setPlayerType(value), playerType, playerTypes)}
            {buildDefaultSelectField("statsType", "Stats Type", (value: string) => setStatsType(value), statsType, statsTypes)}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setIsPlayerUploadDialogOpen(false)} variant="contained">
            Cancel
          </Button>
          <Button color="primary" component="label" variant="contained">
            <input aria-label="Upload player file" hidden onChange={onUploadFileChange} onClick={clearInputFile} type="file" />
            <span>Upload</span>
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        autoHideDuration={2000}
        onClose={() => setIsSnackbarOpen(false)}
        open={isSnackbarOpen}
      >
        <Alert severity={alertProps.severity}>{alertProps.message}</Alert>
      </Snackbar>
    </>
  );
}
