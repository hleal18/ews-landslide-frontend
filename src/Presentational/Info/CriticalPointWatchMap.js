import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { MapWithCenter } from "../Info/Map/Map";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMap = ({
  title,
  showDialog,
  handleClose,
  handleSubmit,
  children,
  maxWidth = "lg",
  contextText = "",
}) => (
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
        <DialogContentText>{contextText}</DialogContentText>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
        {/* <Button onClick={handleSubmit} color="primary">
          Agregar
        </Button> */}
      </DialogActions>
    </Dialog>
  </div>
);

export default (props) => (
  <div>
    {props.position ? (
      <DialogMap
        title={props.title}
        showDialog={props.showWatchMap}
        handleClose={props.handleClose}
      >
        <Typography component="p" color="textSecondary">
          Ubicación punto crítico
        </Typography>
        <MapWithCenter
          position={{
            lat: props.position.lat,
            lng: props.position.lng,
          }}
          // handleClick={props.handleMapClick}
        />
        <p>
          lat: {props.lat} lng: {props.lng}
        </p>
        {/* {props.isLoading && (
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <div>
              <CircularProgress />
            </div>
          </Grid>
        </Grid>
      )} */}
      </DialogMap>
    ) : (
      <div></div>
    )}
  </div>
);
