import HeroSlide from "../coponents/utilitiesCpmponents/hero-slide/HeroSlide";
import Header from "../coponents/utilitiesCpmponents/header/Header";


const Home = () => {
  const movieItems = [
    {
      id: 1,
      title: 'Movie Title 1',
      backdrop_path: 'https://m.media-amazon.com/images/M/MV5BZDBiMGFkNzYtNDg1MC00NzJkLTlhMTMtMWIzYWE4NzU4Yjc5XkEyXkFqcGdeQXVyODgwOTExNjU@._V1_.jpg',
      poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtFm2w1eAinQAdjRE2B21r9sL2wPdPTTxog&s',
      overview: 'Overview of Movie 1...',
      trailerUrl: 'https://www.youtube.com/embed/trailer_key_1', // Optional
    },
    {
      id: 2,
      title: 'Movie Title 2',
      backdrop_path: 'https://m.media-amazon.com/images/M/MV5BZDBiMGFkNzYtNDg1MC00NzJkLTlhMTMtMWIzYWE4NzU4Yjc5XkEyXkFqcGdeQXVyODgwOTExNjU@._V1_.jpg',
      poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtFm2w1eAinQAdjRE2B21r9sL2wPdPTTxog&s',
      overview: 'Overview of Movie 2...',
      trailerUrl: 'https://www.youtube.com/embed/trailer_key_2', // Optional
    },
    // Add more movie objects as needed
  ];

  return (
    <div>
         <Header />
      <HeroSlide movieItems={movieItems} />
    </div>
  );
};

export default Home;