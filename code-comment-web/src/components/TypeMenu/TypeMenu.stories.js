import React from "react";
import TypeMenu from "./TypeMenu";

export default {
  title: "TypeMenu",
  component: TypeMenu,
};

const Template = (args) => <TypeMenu {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {
  setValue: console.log,
  arg: {
    name: "faux",
    type: "string",
  },
};
