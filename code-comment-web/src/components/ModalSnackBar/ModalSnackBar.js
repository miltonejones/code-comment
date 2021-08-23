/* tango-associate-ui/src/components/Common/ModalSnackBar/ModalSnackBar.js
 *  General use snack bar
 */
import React from "react";
import { makeStyles } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  ModalSnackBar: {
    margin: 10,
    padding: 10,
  },
}));

/**
 * [renders the ModalSnackBar component]
 *
 * @param text text to display
 * @param open sets whether snackbar is open
 * @param quit fires when the snackbar closes
 * @param undo undo function, if any
 * @param vertical vertical placement of the snackbar
 * @param horizontal horizontal placement of the snackbar
 */
const ModalSnackBar = ({ text, open, quit, undo, vertical, horizontal }) => {
  const classes = useStyles();

  return (
    <div className={classes.ModalSnackBar} data-testid="ModalSnackBar">
      <Snackbar
        anchorOrigin={{
          vertical,
          horizontal,
        }}
        open={open}
        autoHideDuration={6000}
        onClose={quit}
        message={text}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={undo}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              data-testid="ModalSnackBarIconButton"
              onClick={quit}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

ModalSnackBar.defaultProps = {
  open: false,
  text: "Add words here",
  vertical: "bottom",
  horizontal: "left",
};

export default ModalSnackBar;

/**
 * [configures a state setter to open the snack bar]
 * @param make set setter function
 */
const ModalSnackBarConfig = (make) => (text, horizontal, vertical) =>
  new Promise((callback) => {
    make({
      vertical,
      horizontal,
      text,
      open: true,
      undo: () => {
        callback(true);
        make({ open: false });
      },
      quit: () => {
        callback(false);
        make({ open: false });
      },
    });
  });

export { ModalSnackBarConfig };
