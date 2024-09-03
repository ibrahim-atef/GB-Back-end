import "./header.scss";
import logo from "../../assets/Netflix.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
];
const Header = () => {
  const { pathname } = useLocation();
  const active = headerNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);
  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap">
        <div className="header__wrap__left">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <ul className="header__nav">
            {headerNav.map((e, i) => (
              <li key={i} className={`${i === active ? "active" : ""}`}>
                <Link to={e.path}>{e.display}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="header__wrap__right">
          <div className="header__search">
            <i className="bx bx-search"></i>
          </div>
          <i className="bx bx-bell"></i>
          <span>KID</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
