import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./movieList.scss";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
// import { Link } from "react-router-dom";
// import Button from "../button/Button";
import tmdbApi, { category } from "../../api/tmdbApi";
// import apiConfig from "../../api/apiConfig";
import MovieCard from "../movieCard/MovieCard";

const MovieList = (props) => {
  const [movieItems, setMovieItems] = useState([]);
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 8000 })]
  );
  useEffect(() => {
    const getMoviesList = async () => {
      let response = null;
      const params = {};
      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }

      setMovieItems(response.results);
    };

    getMoviesList();
  }, []);
  return (
    <div className="hero-slide movie-list">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {movieItems.map((item) => (
              <div key={item.id} className="embla__slide">
                <MovieCard item={item} category={props.category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

  id: PropTypes.number,

  children: PropTypes.node,
};

export default MovieList;
