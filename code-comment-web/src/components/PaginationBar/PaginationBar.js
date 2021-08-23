import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  PaginationBar: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
}));

const PaginationBar = ({ startPage, pageSize, collection, gotoPage }) => {
  const classes = useStyles();
  const descText = `${startPage + 1} to ${Math.min(
    startPage + pageSize,
    collection.length
  )} of  ${collection.length}`;
  const last = startPage + pageSize >= collection.length;
  return (
    <div className={classes.PaginationBar}>
      <Button disabled={startPage < 1} onClick={() => gotoPage(-1)}>
        {" "}
        <ArrowBack /> back
      </Button>
      <div>{descText}</div>
      <Button disabled={last} onClick={() => gotoPage(1)}>
        {" "}
        next
        <ArrowForward />
      </Button>
    </div>
  );
};

PaginationBar.defaultProps = {};
export default PaginationBar;
