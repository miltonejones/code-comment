import React from "react";
import CommentGridFooter from "./CommentGridFooter";

export default {
  title: "CommentGridFooter",
  component: CommentGridFooter,
};

const Template = (args) => <CommentGridFooter {...args} />;
export const DefaultView = Template.bind({});

const PageArgs = {
  startPage: 20,
  pageSize: 10,
  collection: (function () {
    for (var v = [], i = 1001; !!--i; v.push(i));
    return v;
  })(),
  gotoPage: console.log,
};

DefaultView.args = {
  collapsed: false,
  progress: 88,
  PageArgs,
  count: 100,
  valid: 88,
  param: "",
  hide: false,
  setHide: console.log,
  setPage: console.log,
  setCollapsed: console.log,
};
