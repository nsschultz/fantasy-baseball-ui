import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import PlayerView from '../../pages/player-view';
import PropTypes from 'prop-types';
import React from 'react';

const EditDialog = ({onClose, open, title, object}) => {

  const handleCancel = () => { onClose(); };

  const handleSave = () => { onClose(); };

  return (
    <Dialog fullWidth={true} maxWidth='lg' open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent><PlayerView player={object}/></DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant='contained' color='primary' component='label'>Save</Button>
        <Button onClick={handleCancel} variant='contained' color='secondary' component='label'>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

EditDialog.propTypes = { 
  onClose: PropTypes.func.isRequired,
  object: PropTypes.object,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default EditDialog;