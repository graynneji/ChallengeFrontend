import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { sectorsData } from "../../app/thunks/sectorsThunk";
import { postSelection } from "../../app/thunks/userSelectionThunk";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import styles from "App.module.css";
import { userSelectionFormSchema } from "features/validationSchema";

const Header = lazy(() => import("components/Header/Header"));

const Dashboard = () => {
  const dispatch = useDispatch();
  const { sectors, selections } = useSelector(
    (state) => state.sectorsSelections
  );
  const { fullName, sector, agree, message, error, processing } = useSelector(
    (state) => state.userSelections
  );
  const [selectedOption, setSelectedOption] = useState(null);

  const toast = useToast();
  useEffect(
    function () {
      dispatch(sectorsData());
    },
    [dispatch, fullName, sector, agree]
  );

  useEffect(
    function () {
      if (selections) {
        setValues({
          fullName: selections.fullName || "",
          agree: selections.agree || false,
        });

        setSelectedOption({
          value: selections.sector,
          label: selections.sector,
        });
      }
    },
    [selections]
  );

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
  }, [message, error, toast]);

  const memoizedData = useMemo(() => sectors, [sectors]);

  const flattenOptions = (memoizedData, prefix = "") => {
    let result = [];
    memoizedData?.forEach((item) => {
      if (typeof item === "string") {
        result.push({ value: prefix + item, label: item });
      } else {
        const key = Object.keys(item)[0];
        const subOptions = flattenOptions(item[key], key + "/");
        result.push({
          value: prefix + key + "/",
          label: key,
          options: subOptions,
          isDisabled: true,
        });
        result = result.concat(subOptions);
      }
    });
    return result;
  };

  const flattenedOptions = flattenOptions(memoizedData);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const {
    values,
    handleBlur,
    setValues,
    handleSubmit,
    errors,
    touched,
    handleChange,
  } = useFormik({
    initialValues: {
      fullName: "",
      agree: false,
      sector: "",
    },
    validationSchema: userSelectionFormSchema,
    onSubmit: (formValues) => {
      const valuesToSave = {
        ...formValues,
        sector: selectedOption.value,
      };
      console.log(valuesToSave);
      // Dispatch the postSelection thunk with the combined values
      dispatch(postSelection({ values: valuesToSave }));
      toast.closeAll();
    },
  });

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
      <Header />
      <Box maxWidth="600px" margin="auto">
        <h1>THIS IS THE DASHBOARD</h1>
        <Box mb={4}>
          <FormControl id="fullname">
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.fullName && errors.fullName}
            />
            {touched.fullName && (
              <p className={styles.errorStyles}>{errors.fullName}</p>
            )}
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl id="selectSector">
            <FormLabel>Select Sector</FormLabel>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              options={flattenedOptions}
            />
          </FormControl>
        </Box>
        <Box mb={4}>
          <FormControl>
            <Checkbox
              name="agree"
              isChecked={values.agree}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.agree && errors.agree}
            >
              I agree to the terms and conditions
            </Checkbox>
            {touched.agree && (
              <p className={styles.errorStyles}>{errors.agree}</p>
            )}
          </FormControl>
        </Box>

        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
          {processing ? "Saving..." : "Save"}
        </Button>
      </Box>
    </Suspense>
  );
};

export default Dashboard;
