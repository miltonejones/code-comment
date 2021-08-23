import React from "react";
import ReadinessSectionHeader from "./ReadinessSectionHeader";

export default {
  title: "HomeScreen/ReadinessSectionHeader",
  component: ReadinessSectionHeader,
};

const Template = (args) => (
  <ReadinessSectionHeader {...args}>
    Section Header Caption
  </ReadinessSectionHeader>
);
export const DefaultView = Template.bind({});
DefaultView.args = {};
