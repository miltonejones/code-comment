/* tango-associate-ui/src/components/WaitingSpinner/WaitingSpinner.js
 *  global spinner with backdrop
 */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { CircularProgress } from "@material-ui/core";
import Observer from "../../app/Observables";
const useStyles = makeStyles((theme) => ({
  WaitingSpinner: {
    margin: 0,
    padding: 0,
    maxWidth: 24,
    maxHeight: 24,
  },
  spinningItem: {
    animation: "$icon-rotate 0.8s infinite linear",
  },
  "@keyframes icon-rotate": {
    from: {
      transform: "rotateZ(0)",
    },
    to: {
      transform: "rotateZ(360deg)",
    },
  },
  backdrop: {
    zIndex: 22,
  },
}));

/**
 * [renders the WaitingSpinner component]
 *
 * @param icon icon to display in the spinner
 * @param debug supports Jest testing
 * @param suppress suppress css spinning animation
 * @param color color of the spinner (default = black)
 */
const WaitingSpinner = ({ icon, debug, suppress, color }) => {
  const [on, setOn] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    SpinnerAction.subscribe((ret) => {
      setOn(ret);
    });
  });

  /**
   * [fires when spinner closes]
   *
   */
  const handleClose = () => {
    !!debug && setOn(false);
  };
  return (
    <>
      <Backdrop
        style={{ color }}
        data-testid="backdrop"
        onClick={handleClose}
        classes={{ root: classes.backdrop }}
        open={on}
      >
        <div
          className={[
            classes.WaitingSpinner,
            on && !suppress ? classes.spinningItem : "",
          ].join(" ")}
          data-testid="test-for-WaitingSpinner"
        >
          {icon}
        </div>
      </Backdrop>
    </>
  );
};

WaitingSpinner.defaultProps = {
  icon: <CircularProgress color="inherit" />,
  suppress: !0,
};
export default WaitingSpinner;

export const SpinnerAction = new Observer("SpinnerAction");
