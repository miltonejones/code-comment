/* tango-associate-ui/src/components/JobReadiness/ReadinessSectionHeader/ReadinessSectionHeader.js
 *  common title text component
 */
import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  ReadinessSectionHeader: {
    fontFamily: "monospace",
    height: 32,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    cursor: "default",
    display: "flex",
    alignItems: "center",
  },
}));

/**
 * [renders the ReadinessSectionHeader component]
 *
 * @param props properties of the component
 */
const ReadinessSectionHeader = (props) => {
  const classes = useStyles();
  return (
    <div
      onClick={props.click}
      className={[classes.ReadinessSectionHeader, props.className].join(" ")}
      data-testid="test-for-ReadinessSectionHeader"
    >
      {props.children}
    </div>
  );
};

ReadinessSectionHeader.defaultProps = {};
export default ReadinessSectionHeader;
