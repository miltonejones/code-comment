import { Collapse, Tab, Tabs } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import Highlight from "react-highlight";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";

const CommentFileViewer = ({ files, postChange, markupIndex, markup }) => {
  const classes = CodeCommentGridStyles();
  return (
    <div>
      {" "}
      <Collapse in={!!files?.length}>
        <Tabs
          className={classes.Tabs}
          value={markupIndex}
          onChange={postChange}
          aria-label="simple tabs example"
        >
          {files?.map((f, i) => (
            <Tab
              className={classes.Tab}
              key={i}
              label={f.file.split("/").pop()}
            />
          ))}
          <Tab style={{ marginLeft: "auto" }} icon={<Close />} />
        </Tabs>
      </Collapse>
      <pre>
        <Highlight className={classes.code} language="javascript">
          {markup}
        </Highlight>
      </pre>
    </div>
  );
};

CommentFileViewer.defaultProps = {};
export default CommentFileViewer;
