import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import React from "react";

const PlayerDeleter = ({ onClose, open, player }) => (
  <>
    <Helmet>
      <title>Delete Player | Fantasy Baseball Analyzer</title>
    </Helmet>
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>{`Are you sure you want to delete player: ${player.name}?`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onClose(player)} variant="contained">
          Yes
        </Button>
        <Button color="secondary" onClick={() => onClose()} variant="contained">
          No
        </Button>
      </DialogActions>
    </Dialog>
  </>
);
PlayerDeleter.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  player: PropTypes.object,
};
export default PlayerDeleter;
