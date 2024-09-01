import "./footer.scss";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import bg from "../../../assets/footer-bg.jpg";
import logo from "../../../assets/Netflix.png";
import AccordionComponent from "../Accordion/accordionComponent";
import Modal, { ModalContent } from "../Modal/Modal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const faqItems = [
    {
      title: "Question 1",
      children: <p>Answer to question 1.</p>,
    },
    {
      title: "Question 2",
      children: (
        <p>
          Netflix is a streaming service that offers a wide variety of
          award-winning TV shows, movies, anime, documentaries, and more on
          thousands of internet-connected devices.You ca watch as much as you
          want, whenever you want all for one low monthly price. Theres always
          something new to discover and new TV shows and movies are added.
        </p>
      ),
    },  {
      title: "Question 3",
      children: (
        <div className="accordion-content-wrapper">
          <img
            src="https://www.indiewire.com/wp-content/uploads/2019/12/us-1.jpg?w=758"
            alt="Question 2"
            className="accordion-content-image"
          />
          <p className="accordion-content-description">
            Netflix is a streaming service that offers a wide variety of
            award-winning TV shows, movies, anime, documentaries, and more on
            thousands of internet-connected devices. You can watch as much as you
            want, whenever you want, all for one low monthly price. There's always
            something new to discover and new TV shows and movies are added.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Term of services</Link>
            <Link to="/">About us</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Live</Link>
            <Link to="#" onClick={openModal}>
              FAQ
            </Link>

            <Link to="/">Premium</Link>
            <Link to="/">Pravacy policy</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">You must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__text">
          Copyright © 2024 tMovies. All rights reserved to <span>MoTaz</span>
        </p>
      </div>
      <Modal active={isModalOpen} onClose={closeModal}>
        <ModalContent onClose={closeModal}>
          <AccordionComponent items={faqItems} />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Footer;
