import React from "react";
import ArgumentRow from "./ArgumentRow";
import data from "../../../stories/assets/data.json";
import { CodeCommentGridStyles } from "../CodeCommentGrid.classes";
export default {
  title: "ArgumentRow",
  component: ArgumentRow,
};
const file = data[10];

const Template = (args) => {
  const classes = CodeCommentGridStyles();
  return (
    <ul className={classes.ul}>
      <ArgumentRow {...args} />;
    </ul>
  );
};

export const DefaultView = Template.bind({});
DefaultView.args = {
  arg: file.methods[0].args[0],
  file: file,
  meth: file.methods[0],
  setArgProp: console.log,
  handleArgChange: console.log,
};
