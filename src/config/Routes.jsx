import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/details/Details";
import Catalog from "../pages/Catalog";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category/:id" element={<Details />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/:category/search/:keyword" element={<Catalog />} />
    </Routes>
  );
};

export default AppRoutes;
