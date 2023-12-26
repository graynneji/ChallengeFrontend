import React, { lazy, Suspense } from "react";
import { Spinner } from "@chakra-ui/react";

const Header = lazy(() => import("components/Header/Header"));

const Dashboard = () => {
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
      <h1>THIS IS THE DASHBOARD</h1>
    </Suspense>
  );
};

export default Dashboard;
