import "./hero-slide.scss";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import Button, { OutlinedButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const HeroSlide = ({ movieItems }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 50000 })]
  );

  return (
    <div className="hero-slide">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {movieItems.map((item) => (
            <div key={item.id} className="embla__slide">
              <HeroSlideItem item={item} className={"active"} />
            </div>
          ))}
        </div>
      </div>
      {movieItems.map((item) => (
        <TrailerModal key={item.id} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = ({ item, className }) => {
  const navigate = useNavigate();

  const background = item.backdrop_path
    ? item.backdrop_path
    : item.poster_path;

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videoSrc = item.trailerUrl || "No trailer available"; // Handle missing trailers
    modal
      .querySelector(".modal__content > iframe")
      .setAttribute("src", videoSrc);

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate(`/movie/${item.id}`)}>
              Watch Now
            </Button>
            <OutlinedButton onClick={setModalActive}>
              <span>Watch trailer</span>
            </OutlinedButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={item.poster_path} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);
  const onClose = () => {
    iframeRef.current.setAttribute("src", "");
  };

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

HeroSlide.propTypes = {
  movieItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string,
      poster_path: PropTypes.string.isRequired,
      overview: PropTypes.string,
      trailerUrl: PropTypes.string, // New field for the trailer URL
    })
  ).isRequired,
};

HeroSlideItem.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TrailerModal.propTypes = {
  item: PropTypes.object.isRequired,
};

export default HeroSlide;
