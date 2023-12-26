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
import styles from "App.module.css";
import { registrationFormSchema } from "features/validationSchema";
import { userRegistrationReset } from "app/reducers/registeruser";
import { userRegistration } from "app/thunks/userRegistrationThunk";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const [reqId, setReqId] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const { isModalOpen } = useSelector((state) => state.actions);
  const closeModal = () => dispatch(triggerModalClose());
  const { error, message } = useSelector((state) => state.registeruser);
  useSelector((state) => console.log(state));

  const [visible, setVisible] = useState(false);
  const handlePasswordVisibility = () => setVisible(!visible);

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(userRegistrationReset());
    const { requestId } = dispatch(userRegistration({ values, dispatch }));
    setReqId(requestId);
    setSubmitting(false);
    toast.closeAll();
  };

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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationFormSchema,
    onSubmit,
  });

  useEffect(() => {
    dispatch(userRegistrationReset());
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (!error && message !== "") {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [reqId, message, error, toast]);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John"
                value={values.firstName}
                isInvalid={touched.firstName && errors.firstName}
              />
              {touched.firstName && (
                <p className={styles.errorStyles}>{errors.firstName}</p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Smith"
                value={values.lastName}
                isInvalid={touched.lastName && errors.lastName}
              />
              {touched.lastName && (
                <p className={styles.errorStyles}>{errors.lastName}</p>
              )}
            </FormControl>

            <FormControl mt={4}>
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

            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confrim your password..."
                value={values.confirmPassword}
                isInvalid={touched.confirmPassword && errors.confirmPassword}
              />
              {touched.confirmPassword && (
                <p className={styles.errorStyles}>{errors.confirmPassword} </p>
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
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default Register;
