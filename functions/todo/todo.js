const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb"),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
    todos: [Todo!]
  }
  type Todo {
    id: ID!
    text: String!
    done: Boolean!
  }
  type Mutation {
    addTodo(text: String!): Todo
    deleteTodo(id: ID!): Todo
    updateTodo(id: ID!): Todo
  }
`;

const resolvers = {
  Query: {
    todos: async (root, args, context) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
          domain: "db.us.fauna.com",
          scheme: "https",
        });
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("todoIndex"))),
            q.Lambda((x) => q.Get(x))
          )
        );
        return result.data.map((todo) => {
          return {
            id: todo.ref.id,
            text: todo.data.text,
            done: todo.data.done,
          };
        });
      } catch (err) {
        console.log("**** Error ****", err);
      }
    },
  },

  Mutation: {
    addTodo: async (_, { text }) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
          domain: "db.us.fauna.com",
          scheme: "https",
        });
        const result = await client.query(
          q.Create(q.Collection("todos"), {
            data: {
              text,
              done: false,
            },
          })
        );
        return result.data;
      } catch (err) {
        console.log("**** Error ****", err);
      }
    },

    updateTodo: async (_, { id }) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
          domain: "db.us.fauna.com",
          scheme: "https",
        });

        await client.query(
          q.Update(q.Ref(q.Collection("todos"), id), { data: { done: true } })
        );
      } catch (err) {
        console.log("**** Error ****", err);
      }
    },

    deleteTodo: async (_, { id }) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_KEY,
          domain: "db.us.fauna.com",
          scheme: "https",
        });

        await client.query(q.Delete(q.Ref(q.Collection("todos"), id)));
      } catch (err) {
        console.log("**** Error ****", err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});

module.exports = { handler };
