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
export const ExpandedView = Template.bind({});
export const EmptyView = Template.bind({});
export const EmptyExpandedView = Template.bind({});

const file = data[10];
DefaultView.args = {
  collapsed: false,
  last: true,
  odd: true,
  file,

  setNodeValue: console.log,
  validFile: () => true,
  expand: console.log,

  meth: file.methods[0],
  iifMethChange: console.log,
  handleMethChange: console.log,
  markup: "this is some markup",
  set: console.log,
  setArgProp: console.log,
  handleArgChange: console.log,
};

ExpandedView.args = {
  ...DefaultView.args,
  file: { ...file, expanded: true },
};

EmptyView.args = {
  ...DefaultView.args,
  file: { ...data[3], expanded: false },
};
EmptyExpandedView.args = {
  ...DefaultView.args,
  file: { ...data[3], expanded: true },
};
