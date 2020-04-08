import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// Transition for when the dialog appears, sliding up.
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForm({
    title,
    showDialog, 
    handleClose, 
    handleSubmit,
    children,
    maxWidth = 'lg',
    contextText = ''
}) {
  return (
    <div>
      <Dialog 
        open={showDialog} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
        maxWidth={maxWidth}
        fullWidth={true}
        >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contextText}
          </DialogContentText>
          {children}
        </DialogContent>
            
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
