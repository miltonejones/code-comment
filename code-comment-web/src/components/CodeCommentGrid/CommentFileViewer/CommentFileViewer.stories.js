import React from 'react';
import CommentFileViewer from './CommentFileViewer';

export default {
  title: 'CommentFileViewer',
  component: CommentFileViewer
};

const Template = (args) => <CommentFileViewer {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
