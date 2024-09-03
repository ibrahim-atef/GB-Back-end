import { Link } from "react-router-dom";
import HeroSlide from "../coponents/hero-slide/HeroSlide";
import { OutlinedButton } from "../coponents/button/Button";
import MovieList from "../coponents/movieList/MovieList";
import { category, movieType } from "../api/tmdbApi";
 
 const Home = () => {
  return (
    <div>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlinedButton className="small">View More</OutlinedButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlinedButton className="small">View More</OutlinedButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Popular TV Shows</h2>
            <Link to="/tv">
              <OutlinedButton className="small">View More</OutlinedButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.popular} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV Shows</h2>
            <Link to="/tv">
              <OutlinedButton className="small">View More</OutlinedButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.top_rated} />
        </div>
      </div>
    </div>
  );
};

export default Home;
