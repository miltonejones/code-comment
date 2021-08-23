import React from "react";
import { Collapse, Tab, Tabs } from "@material-ui/core";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";

const AppTabs = ({ param, tabValue, postChange }) => {
  const classes = CodeCommentGridStyles();
  return (
    <div className={classes.flex}>
      <Collapse in={!param}>
        <Tabs
          value={tabValue}
          onChange={postChange}
          aria-label="simple tabs example"
        >
          <Tab label="Milton" />
          <Tab label="Team" />
          <Tab label="Raw" />
        </Tabs>
      </Collapse>
    </div>
  );
};

AppTabs.defaultProps = {};
export default AppTabs;
