const React = require("react");
const { ThemeProvider } = require("theme-ui");
const { swiss } = require("@theme-ui/presets");
const { Provider } = require("./identity-context");

const tokens = {
  sizes: { container: 500 },
};

module.exports = ({ element }) => (
  <Provider>
    <ThemeProvider theme={tokens}>{element}</ThemeProvider>
  </Provider>
);
