import React from "react";
import ArgumentRow from "./ArgumentRow";
import data from "../../../stories/assets/data.json";
export default {
  title: "ArgumentRow",
  component: ArgumentRow,
};
const file = data[10];
const Template = (args) => <ArgumentRow {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {
  arg: file.methods[0].args[0],
  file: file,
  meth: file.methods[0],
  setArgProp: console.log,
  handleArgChange: console.log,
};
