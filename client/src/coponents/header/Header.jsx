import React, { useState, useEffect, useRef } from "react";
import "./header.scss";
import logo from "../../assets/Netflix.png";
import { Link, useLocation } from "react-router-dom";
import IconButton from "../iconButton/IconButton";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import SearchField from "../search/SearchField"; // Import the SearchField component

const headerNav = [
  { display: "Home", path: "/" },
  { display: "Movies", path: "/movie" },
  { display: "TV Series", path: "/tv" },
  { display: "Search", path: "/search" },
];

const Header = () => {
  const { pathname } = useLocation();
  const active = headerNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false); // State for showing search component

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
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

  const handleSearchIconClick = () => {
    setShowSearch(prev => !prev); // Toggle search field visibility
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Netflix Logo" />
          </Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
        <div className={`header__search ${showSearch ? 'visible' : ''}`}>
          <SearchField onSearchResultClicked={(item) => console.log('Search result clicked:', item)} />
        </div>
        {!showSearch && <div className="header__spacer"></div>} {/* Spacer div when search field is not visible */}
        <div className="header__icons">
          <IconButton
            icon={faSearch}
            size="20px"
            color="#fff"
            onClick={handleSearchIconClick} // Toggle search field on icon click
          />
          <IconButton
            icon={faBell}
            size="20px"
            color="#fff"
            onClick={() => console.log("Notifications clicked")}
          />
        </div>
      </div>  
    </div>
  );
};

export default Header;
