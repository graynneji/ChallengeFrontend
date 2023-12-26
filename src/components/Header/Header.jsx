import React from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "app/thunks/userLogoutThunk";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoggedIn } = useSelector((state) => state.loginUser);
  const { firstName, lastName } = data;
  const userName = `${firstName} ${lastName}`;
  console.log(data.email);

  const logoutUser = () => {
    console.log("triggered logout");
    dispatch(userLogout(data));
    navigate("/");
  };

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6} m="10px">
      <GridItem colStart={1} colEnd={1}>
        <Button colorScheme="blue" mr={3} onClick={logoutUser}>
          Logout
        </Button>
      </GridItem>
      <GridItem colStart={6} colEnd={8}>
        <Flex>
          <Avatar name={userName} />
          <Box ml="3">
            <Text fontWeight="bold">
              {userName}
              <Badge ml="1" colorScheme="green">
                New
              </Badge>
            </Text>
            <Text fontSize="sm">UI Engineer</Text>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Header;
