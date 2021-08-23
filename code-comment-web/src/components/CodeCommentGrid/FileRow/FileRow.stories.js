import React from "react";
import FileRow from "./FileRow";
import data from "../../../stories/assets/data.json";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";

export default {
  title: "FileRow",
  component: FileRow,
};

const Template = (args) => {
  const classes = CodeCommentGridStyles();
  return (
    <ul className={classes.ul}>
      <FileRow {...args} />
    </ul>
  );
};

export const DefaultView = Template.bind({});

const file = data[10];
DefaultView.args = {
  file: { ...file, expanded: true },

  setNodeValue: console.log,
  validFile: () => true,
  expand: console.log,
  last: true,

  meth: file.methods[0],
  odd: true,
  iifMethChange: console.log,
  handleMethChange: console.log,
  collapsed: false,
  markup: "this is some markup",
  set: console.log,
  setArgProp: console.log,
  handleArgChange: console.log,
};
