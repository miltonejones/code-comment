import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  FormControlLabel,
  LinearProgress,
  Switch,
  Typography,
} from "@material-ui/core";
import PaginationBar from "../../PaginationBar/PaginationBar";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";

const CommentGridFooter = ({
  collapsed,
  progress,
  PageArgs,
  count,
  valid,
  param,
  hide,
  setHide,
  setPage,
  setCollapsed,
}) => {
  const classes = CodeCommentGridStyles();
  return (
    <>
      <LinearProgress
        variant="determinate"
        value={progress}
        classes={{ root: classes.progress }}
      />

      <PaginationBar {...PageArgs} />
      <Typography>
        {count} items. {valid} are complete.{" "}
        {!param && (
          <>
            <FormControlLabel
              control={
                <Switch
                  checked={hide}
                  onChange={() => {
                    setHide(!hide);
                    setPage(0);
                  }}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Hide completed items"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={collapsed}
                  onChange={() => {
                    setCollapsed(!collapsed);
                  }}
                  name="checkedB"
                  color="primary"
                />
              }
              label="View file contents"
            />
          </>
        )}
      </Typography>
    </>
  );
};

CommentGridFooter.defaultProps = {};
export default CommentGridFooter;
