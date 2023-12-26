import React, { lazy, Suspense } from "react";
import logo from "assets/logo.png";
import styles from "components/Home/home.module.css";
import { Button, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { triggerModalOpen } from "app/reducers/actions";
import { userRegistrationReset } from "app/reducers/registeruser";
import { userLoginReset } from "app/reducers/loginUser";
import { Spinner } from "@chakra-ui/react";

const Login = lazy(() => import("components/Login/Login"));
const Register = lazy(() => import("components/Register/Register"));

const Home = () => {
  const dispatch = useDispatch();
  const openModal = (modal) => {
    dispatch(userRegistrationReset());
    dispatch(userLoginReset());
    dispatch(triggerModalOpen(modal));
  };
  const { action } = useSelector((state) => state.actions);

  return (
    <Suspense
      fallback={
        <Spinner
          thickness="10px"
          speed="0.50s"
          emptyColor="teal.200"
          color="blue.500"
          size="xl"
        />
      }
    >
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      {action === "login" && <Login />}
      {action === "register" && <Register />}
      <div className={styles.container}>
        <Stack direction="row" spacing={10} align="center">
          <Button colorScheme="blue" onClick={() => openModal("login")}>
            Login
          </Button>
          <Button colorScheme="teal" onClick={() => openModal("register")}>
            Register
          </Button>
        </Stack>
      </div>
    </Suspense>
  );
};

export default Home;
