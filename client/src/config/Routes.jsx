import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

 
const LandingPage = lazy(() => import("../pages/LandingPage"));
const ErrorPage = lazy(() => import("../coponents/utilitiesCpmponents/errorPage/ErrorPage"));
const HomePage = lazy(() => import("../pages/Home"));
const Details = lazy(() => import("../pages/details/Details"));
const Catalog = lazy(() => import("../pages/Catalog"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes from home-data-controller */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />

      {/* Additional routes from Movies-Search */}
      <Route path="/:category/:id" element={<Details />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/:category/search/:keyword" element={<Catalog />} />
    </Routes>
  );
};

export default AppRoutes;
