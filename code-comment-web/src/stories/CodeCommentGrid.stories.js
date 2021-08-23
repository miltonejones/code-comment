import React from "react";
import CodeCommentGrid from "../components/CodeCommentGrid/CodeCommentGrid.js";

export default {
  title: "CodeCommentGrid",
  component: CodeCommentGrid,
};

const Template = (args) => <CodeCommentGrid {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {};
