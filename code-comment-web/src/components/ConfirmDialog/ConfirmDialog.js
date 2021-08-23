/* tango-associate-ui/src/components/ConfirmDialog/ConfirmDialog.js
 *  global dynamic dialog component
 */
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: "center",
  },
  container: {
    width: "100vw",
  },
  title: {
    padding: "12px",
    fontWeight: 800,
  },
}));

export function ConfirmDrawer({ send, open, text, quiz }) {
  const classes = useStyles();
  const [back, setBack] = useState(quiz);
  return (
    <>
      <Drawer anchor="top" open={open} onClose={() => send(back || quiz)}>
        <div className={classes.title}>
          <TextField
            defaultValue={quiz}
            autoFocus
            fullWidth
            onKeyUp={(e) => e.keyCode === 13 && send(back)}
            onChange={(e) => setBack(e.target.value)}
            id="standard-basic"
            label={text}
            data-testid="ConfirmDialogTextField"
          />
        </div>
      </Drawer>
    </>
  );
}
/**
 * [renders the ConfirmDialog component]
 * @param {function} send sends user response to the calling container
 * @param {boolean} open sets whether dialog is open
 * @param {string} head header text of the dialog
 * @param {string} text body text of the dialog
 * @param {string} foot footer content of the dialog
 * @param {string} quiz prompt question to display, if any
 * @param {object} buttons buttons to show in the footer of the dialog
 * @param {object} buttonOptions options of the dialog buttons
 */
export default function ConfirmDialog({
  send,
  open,
  head,
  text,
  foot,
  quiz,
  buttons,
  buttonOptions,
}) {
  const [back, setBack] = useState(false);

  const classes = useStyles();
  return (
    <div data-testid="ConfirmDialog">
      <Dialog
        classes={{ container: classes.container }}
        open={open}
        style={{ maxWidth: 940 }}
        onClose={() => send(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!!head?.length && (
          <DialogTitle id="alert-dialog-title">{head}</DialogTitle>
        )}

        <DialogContent>
          <div className={classes.title}>{text}</div>
          <Divider />
          {quiz !== undefined && (
            <DialogContentText id="alert-dialog-description">
              <TextField
                defaultValue={quiz}
                autoFocus
                fullWidth
                onKeyUp={(e) => e.keyCode === 13 && send(back)}
                onChange={(e) => setBack(e.target.value)}
                id="standard-basic"
                label="Enter value"
                data-testid="ConfirmDialogTextField"
              />
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button data-testid="ConfirmDialogNo" onClick={() => send(false)}>
            {buttons.no}
          </Button>
          <Button
            classes={{
              containedSecondary: classes.secondary,
            }}
            data-testid="ConfirmDialogYes"
            onClick={() => send(back || true)}
            {...buttonOptions}
            autoFocus
          >
            {buttons.yes}
          </Button>
        </DialogActions>

        {!!foot && (
          <DialogContent>
            <DialogContentText>{foot}</DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

ConfirmDialog.defaultProps = {
  head: "Confirm this action!",
  buttons: {
    yes: "Okay",
    no: "Nope",
  },
  buttonOptions: {
    color: "primary",
    variant: "contained",
  },
  open: false,
};
/**
 * returns confirm function to caller
 * @param {*} make
 */
const DialogConfig = (make) => (text, head, foot, quiz) =>
  new Promise((callback) => {
    make({
      text,
      head,
      foot,
      open: true,
      send: (what) => {
        callback(what);
        make({});
      },
      quiz,
    });
  });

export { DialogConfig };
