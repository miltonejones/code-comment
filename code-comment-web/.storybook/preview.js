import { ThemeProvider } from "@material-ui/core";
import { addDecorator } from "@storybook/react";

addDecorator((story) => {
  return <ThemeProvider>{story()}</ThemeProvider>;
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
