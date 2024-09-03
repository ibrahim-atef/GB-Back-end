import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

 
const LandingPage = lazy(() => import("../pages/LandingPage"));
const ErrorPage = lazy(() => import("../coponents/utilitiesCpmponents/errorPage/ErrorPage"));
const HomePage = lazy(() => import("../pages/Home"));
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} /> { }
    </Routes>
  );
};

export default AppRoutes;
