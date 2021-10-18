import React from "react";
import {
  Checkbox,
  Close,
  Divider,
  Flex,
  Label,
  Text,
} from "@theme-ui/components";
import { useMutation, gql } from "@apollo/client";
import { getTodo } from "../pages";

const deleteTodoMutation = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const updateTodoMutation = gql`
  mutation updateTodo($id: ID!) {
    updateTodo(id: $id) {
      id
    }
  }
`;

const TodoItem = (props) => {
  const [deleteTodo] = useMutation(deleteTodoMutation);
  const [updateTodo] = useMutation(updateTodoMutation);

  const deleteATodo = (id) => {
    deleteTodo({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: getTodo }],
    });
  };

  const updateATodo = (id) => {
    updateTodo({
      variables: {
        id: id,
      },
    });
  };

  return (
    <>
      <Flex sx={{ alignItems: "center", flex: "50%" }}>
        <Label>
          <Checkbox
            defaultChecked={props.done}
            onClick={() => updateATodo(props.id)}
          />
          <Text color="#777" sx={{ fontSize: "16px" }}>
            {props.text}
          </Text>
        </Label>
        <Close
          sx={{ flex: "auto", cursor: "pointer" }}
          onClick={() => deleteATodo(props.id)}
        />
      </Flex>
      <Divider color="#e3e9ff" />
    </>
  );
};

export default TodoItem;
