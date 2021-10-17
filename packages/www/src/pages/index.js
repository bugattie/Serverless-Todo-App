import {
  Button,
  Checkbox,
  Close,
  Container,
  Flex,
  Heading,
  Label,
  MenuButton,
  Text,
} from "@theme-ui/components";
import { Box } from "theme-ui";
import "../styles/global.scss";
import * as homeStyles from "../styles/home.module.scss";
import Swal from "sweetalert2";

const React = require("react");

const Home = () => {
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
      Swal.fire(`Your IP address is ${ipAddress}`);
    }
  };

  return (
    <Container className={homeStyles.container}>
      <Flex sx={{ flexDirection: "column" }}>
        <Box bg="#AF7EEB" p="3">
          <Flex sx={{ alignItems: "center" }}>
            <MenuButton aria-label="Toggle Menu" />
            <Heading as="h1" sx={{ textAlign: "center", flex: "50%" }}>
              Get Stuff Done
            </Heading>
          </Flex>
        </Box>

        <Box
          bg="white"
          color="#AEB8CE"
          marginTop="3"
          p="4"
          className={homeStyles.todo_box}
        >
          <Flex sx={{ alignItems: "center", flex: "50%" }}>
            <Label>
              <Checkbox defaultChecked={true} />
              <Text color="#777" sx={{ fontSize: "16px" }}>
                Hello
              </Text>
            </Label>
            <Close sx={{ flex: "auto", cursor: "pointer" }} />
          </Flex>
          <Button className={homeStyles.btn} bg="#AF7EEB" onClick={openForm}>
            + New task
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
