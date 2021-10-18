const React = require("react");
const { ThemeProvider } = require("theme-ui");
const { Provider } = require("./identity-context");

module.exports = ({ element }) => (
  <Provider>
    <ThemeProvider>{element}</ThemeProvider>
  </Provider>
);
