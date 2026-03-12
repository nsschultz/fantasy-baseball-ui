import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

import { Helmet } from "react-helmet";
import { PlayerDeleterProps } from "../../types/implementation-types";

export default function PlayerDeleter(props: Readonly<PlayerDeleterProps>) {
  const { onClose, open, player } = props;

  return (
    <>
      <Helmet>
        <title>Delete Player | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>{`Are you sure you want to delete player: ${player?.name || ""}?`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => onClose(player)} variant="contained">
            Yes
          </Button>
          <Button color="primary" onClick={() => onClose()} variant="contained">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
