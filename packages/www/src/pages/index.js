import {
  Button,
  Container,
  Flex,
  Heading,
  MenuButton,
  Spinner,
} from "@theme-ui/components";
import { Box } from "theme-ui";
import "../styles/global.scss";
import * as homeStyles from "../styles/home.module.scss";
import Swal from "sweetalert2";
import TodoItem from "../components/TodoItem";
import { useQuery, useMutation, gql } from "@apollo/client";

const React = require("react");

export const getTodo = gql`
  {
    todos {
      id
      text
      done
    }
  }
`;

const addTodoMutation = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      text
    }
  }
`;

const Home = () => {
  const { loading, data, error } = useQuery(getTodo);
  const [addTodo] = useMutation(addTodoMutation);

  const openForm = async () => {
    const { value: ipAddress } = await Swal.fire({
      title: "Todo Description",
      input: "text",
      inputLabel: "Todo Description",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Please write a description about the TASK!";
        }
      },
    });

    if (ipAddress) {
      addTodo({
        variables: {
          text: ipAddress,
        },
        refetchQueries: [{ query: getTodo }],
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
  console.log(data);
  return (
    <Container className={homeStyles.container}>
      <Flex sx={{ flexDirection: "column" }}>
        <Box bg="#AF7EEB" p="3">
          <Flex sx={{ alignItems: "center" }}>
            <MenuButton aria-label="Toggle Menu" />
            <Heading as="h1" sx={{ textAlign: "center", flex: "50%" }}>
              Get Stuff Done
            </Heading>

            <div sx={{ flex: "50%" }}>
              <Button
                className={homeStyles.btn}
                bg="#e3e9ff"
                color="#777"
                onClick={openForm}
              >
                + New task
              </Button>
            </div>
          </Flex>
        </Box>

        <Box bg="white" color="#AEB8CE" marginTop="3" p="4">
          {data.todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                done={todo.done}
              />
            );
          })}
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
