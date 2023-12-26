import { lazy, Suspense } from "react";
import styles from "App.module.css";
import { Routes, Route } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const Home = lazy(() => import("components/Home/home"));
const Dashboard = lazy(() => import("components/Dashboard/Dashboard"));
const App = () => {
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
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
