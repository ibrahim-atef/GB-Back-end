import "./App.scss";
// import "swiper/swiper-bundle.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./coponents/header/Header";
import Footer from "./coponents/footer/Footer";

import Routes from "./config/Routes";

function App() {
  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;
