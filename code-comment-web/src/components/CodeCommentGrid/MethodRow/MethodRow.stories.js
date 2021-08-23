import React from "react";
import MethodRow from "./MethodRow";
import data from "../../../stories/assets/data.json";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";

export default {
  title: "MethodRow",
  component: MethodRow,
};

const file = data[10];
const Template = (args) => {
  const classes = CodeCommentGridStyles();
  return (
    <ul className={classes.ul}>
      <MethodRow {...args} />;
    </ul>
  );
};
export const DefaultView = Template.bind({});
DefaultView.args = {
  file,
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
