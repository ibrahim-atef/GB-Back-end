import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./config/Routes";
import "./App.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

export default App;
