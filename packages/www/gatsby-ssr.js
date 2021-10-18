const wrapRootElement = require("./wrap-root-element");
const React = require("react");

const { ApolloProvider, ApolloClient, HttpLink } = require("@apollo/client");

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://bugattie-todo.netlify.app/.netlify/functions/todo",
  }),
});

exports.wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {wrapRootElement({ element })}
    </ApolloProvider>
  );
};
