import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { triggerModalClose } from "app/reducers/actions";
import { useFormik } from "formik";
import { loginFormSchema } from "features/validationSchema";
import styles from "App.module.css";
import { userLoginReset } from "app/reducers/loginUser";
import { userLogin } from "app/thunks/userLoginThunk";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isModalOpen } = useSelector((state) => state.actions);
  const closeModal = () => dispatch(triggerModalClose());
  const [visible, setVisible] = useState(false);
  const [reqId, setReqId] = useState();
  const handlePasswordVisibility = () => setVisible(!visible);

  const { isLoggedIn, error, message } = useSelector(
    (state) => state.loginUser
  );
  useSelector((state) => console.log(state.loginUser));

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(userLoginReset());
    const { requestId } = dispatch(userLogin({ values, dispatch }));
    setSubmitting(false);
    setReqId(requestId);
    toast.closeAll();
  };

  useEffect(() => {
    error &&
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
  }, [reqId, message, error, toast]);

  //FORM
  const {
    values,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    handleChange,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [reqId, isLoggedIn]);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="someone@example.com"
                value={values.email}
                isInvalid={touched.email && errors.email}
              />
              {touched.email && (
                <p className={styles.errorStyles}>{errors.email}</p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={visible ? "text" : "password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password..."
                  value={values.password}
                  isInvalid={touched.password && errors.password}
                />
                <InputRightElement>
                  {visible ? (
                    <ViewIcon onClick={handlePasswordVisibility} />
                  ) : (
                    <ViewOffIcon onClick={handlePasswordVisibility} />
                  )}
                </InputRightElement>
              </InputGroup>
              {touched.password && (
                <p className={styles.errorStyles}>{errors.password} </p>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={isSubmitting}
              disabled={isEmpty(errors)}
            >
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default Login;
