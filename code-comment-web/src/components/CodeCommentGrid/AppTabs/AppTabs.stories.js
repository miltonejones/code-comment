import React from 'react';
import AppTabs from './AppTabs';

export default {
  title: 'AppTabs',
  component: AppTabs
};

const Template = (args) => <AppTabs {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
