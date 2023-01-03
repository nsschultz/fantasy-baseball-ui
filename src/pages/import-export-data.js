import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Snackbar } from "@mui/material";

import Alert from "@mui/material/Alert";
import FileSaver from "file-saver";
import { Helmet } from "react-helmet";
import IntegrationCard from "../components/card/integration-card";
import React from "react";
import axios from "axios";

/**
 * Creates a new instance of the import/export page.
 * @returns A new instance of ImportExportData.
 */
const ImportExportData = () => {
  const [alertProps, setAlertProps] = React.useState({ message: "", severity: "success" });
  const [isClearDialogOpen, setIsClearDialogOpen] = React.useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

  const clearInputFile = (event) => (event.target.value = null);
  const exportOnClick = () =>
    axios
      .get(`${window.env.PLAYER_API_URL}/api/v2/action/export`, { responseType: "blob" })
      .then((response) => FileSaver.saveAs(new Blob([response.data]), "players.csv"))
      .catch(() => setSnackbar("error", "Failed to export the players."));
  const handleDialogClose = (shouldClear) => {
    setIsClearDialogOpen(false);
    if (!shouldClear) return;
    axios
      .delete(`${window.env.PLAYER_API_URL}/api/v2/player`)
      .then(() => setSnackbar("success", "Successfully cleared the players."))
      .catch(() => setSnackbar("error", "Failed to clear the players."));
  };
  const onBatterFileChange = (event) => onFileChange(event.target.files[0], "batters");
  const onFileChange = (file, type) => {
    const formData = new FormData();
    formData.append(`${type}.csv`, file, file.name);
    console.log("made it here");
    axios
      .post(`${window.env.PLAYER_API_URL}/api/v2/action/upload/projection/${type}`, formData)
      .then(() => setSnackbar("success", `Successfully uploaded the ${type} file.`))
      .catch(() => setSnackbar("error", `Failed to upload the ${type} file.`));
  };
  const onPitcherFileChange = (event) => onFileChange(event.target.files[0], "pitchers");
  const setSnackbar = (severity, message) => {
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
      Upload
      <input hidden onChange={onBatterFileChange} onClick={clearInputFile} type="file" />
    </Button>
  );
  const uploadPitchersFileButton = (
    <Button color="primary" component="label" variant="contained">
      Upload
      <input hidden onChange={onPitcherFileChange} onClick={clearInputFile} type="file" />
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
      <Dialog open={isClearDialogOpen} onClose={() => handleDialogClose(false)}>
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
};
export default ImportExportData;
