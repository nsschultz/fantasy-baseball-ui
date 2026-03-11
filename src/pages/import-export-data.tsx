import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Snackbar } from "@mui/material";

import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";
import type { AppDispatch } from "../state/store";
import FileSaver from "file-saver";
import { Helmet } from "react-helmet";
import IntegrationCard from "../components/card/integration-card";
import type { NotificationMessage } from "../types/basic-types";
import React from "react";
import { addNotification } from "../state/slice/notification-slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function ImportExportData() {
  const [alertProps, setAlertProps] = React.useState<{ message: string; severity: AlertColor }>({ message: "", severity: "info" });
  const [isClearDialogOpen, setIsClearDialogOpen] = React.useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

  const clearInputFile = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };
  const createNotification = (message: string, type: NotificationMessage["type"]) =>
    dispatch(addNotification({ notificationKey: Math.random() * Date.now(), message: message, timestamp: Date.now(), type: type }));
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
  const handleDialogClose = (shouldClear: boolean) => {
    setIsClearDialogOpen(false);
    if (!shouldClear) return;
    axios
      .delete(`${globalThis.env.PLAYER_API_URL}/api/v3/player`)
      .then(() => displaySuccessMessage("Successfully cleared the players."))
      .catch(() => displayErrorMessage("Failed to clear the players."));
    displayInfoMessage("Attempting to clear players");
  };
  const onBatterFileChange = (event: React.ChangeEvent<HTMLInputElement>) => onFileChange(event.target.files?.[0], 1);
  const onFileChange = (file: File | undefined, type: 1 | 2) => {
    if (!file) return;
    const formData = new FormData();
    formData.append(`${type}.csv`, file, file.name);
    axios
      .post(`${globalThis.env.PLAYER_API_URL}/api/v3/action/upload/stats?player=${type}&stats=2`, formData)
      .then(() => displaySuccessMessage(`Successfully uploaded the ${type} file.`))
      .catch(() => displayErrorMessage(`Failed to upload the ${type} file.`));
    displayInfoMessage(`Attempting to upload the ${type} file.`);
  };
  const onPitcherFileChange = (event: React.ChangeEvent<HTMLInputElement>) => onFileChange(event.target.files?.[0], 2);
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
  const uploadBattersFileButton = (
    <Button color="primary" component="label" variant="contained">
      <input hidden onChange={onBatterFileChange} onClick={clearInputFile} type="file" />
      <span>Upload</span>
    </Button>
  );
  const uploadPitchersFileButton = (
    <Button color="primary" component="label" variant="contained">
      <input hidden onChange={onPitcherFileChange} onClick={clearInputFile} type="file" />
      <span>Upload</span>
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
            <Grid item key="uploadBatters" lg={6} md={6} xs={12}>
              <IntegrationCard
                title="Upload Batter File"
                description="Upload the latest version of the batting stats data."
                integrationButton={uploadBattersFileButton}
              />
            </Grid>
            <Grid item key="uploadPitchers" lg={6} md={6} xs={12}>
              <IntegrationCard
                title="Upload Pitcher File"
                description="Upload the latest version of the pitching stats data."
                integrationButton={uploadPitchersFileButton}
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
          <Button color="primary" onClick={() => handleDialogClose(false)} variant="contained">
            No
          </Button>
          <Button color="secondary" onClick={() => handleDialogClose(true)} variant="contained">
            Yes
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
