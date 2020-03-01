import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Map from './Map';

// Transition for when the dialog appears, sliding up.
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForm({ 
    nameContent = '',
    descriptionContent = '',
    mapContent = {
      lat: 0,
      lng: 0  
    },
    showDialog, 
    handleClose, 
    handleSubmit,
    handleMapClick,
    handleText
}) {
  return (
    <div>
      <Dialog 
        open={showDialog} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
        >
        <DialogTitle id="form-dialog-title">Agregar Punto Crítico a INSERTE ZONA</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introduzca cada uno de los campos.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            id="name"
            label="Nombre"
            fullWidth
            required={true}
            value={nameContent}
            onChange={handleText}
            
          />
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            id="description"
            label="Descripción"
            type="text"
            fullWidth
            required={true}
            multiline
            rows={6}
            value={descriptionContent}
            onChange={handleText}
          />
          <Typography component="p" color="textSecondary">
              Seleccione ubicación de referencia
          </Typography>
          <Map 
            position={{
                lat: mapContent.lat,
                lng: mapContent.lng
            }}
            handleClick={handleMapClick}
          />
          
          
            <p>
                lat: {mapContent.lat}   lng: {mapContent.lng}
            </p>
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
