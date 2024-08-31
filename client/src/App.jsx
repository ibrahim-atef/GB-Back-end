import "./App.scss";
// import "swiper/swiper-bundle.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import VideoPlayer from '../src/coponents/VideoPlayer/videoPlayerComponent';

import Header from "./coponents/header/Header";
import Footer from "./coponents/footer/Footer";
import SelectInput from "./coponents/optionInput/Select-Input";

import Routes from "./config/Routes";

function App() {
  return (
    <Router>
      <Header />
      <Routes />
      <SelectInput
        value={"number"}
        onChange={(e) => console.log(e ? e : null)}
        label={"number"}
        placeholder={"number"}
        options={[
          { label: "one", value: 1 },
          { label: "two", value: 2 },
          { label: "three", value: 3 },
        ]}
      />
      
      <Footer />
    </Router>
  );
  // const episodes = [
  //   {
  //     videoSrc: 'https://firebasestorage.googleapis.com/v0/b/psychology-4ee11.appspot.com/o/video%2Fimage_picker1176077482907371623.mp4?alt=media&token=9fbd6758-cb13-469b-ab5d-d44dcc607dc1',
  //     title: 'Episode 1',
  //     description: 'With the promise of a new world, a poor soldier receives...',
  //     image: 'https://firebasestorage.googleapis.com/v0/b/psychology-4ee11.appspot.com/o/image%2Fscaled_image_picker9090588249514965711.jpg?alt=media&token=246ff980-37da-43e8-9b3c-79cbcfa63a02'
  //   },
  //   {
  //     videoSrc: 'https://firebasestorage.googleapis.com/v0/b/psychology-4ee11.appspot.com/o/video%2Fimage_picker1176077482907371623.mp4?alt=media&token=9fbd6758-cb13-469b-ab5d-d44dcc607dc1',
  //     title: 'Episode 2',
  //     description: 'New challenges arise as the team sets off on their journey...',
  //     image: 'https://firebasestorage.googleapis.com/v0/b/psychology-4ee11.appspot.com/o/image%2Fscaled_image_picker9090588249514965711.jpg?alt=media&token=246ff980-37da-43e8-9b3c-79cbcfa63a02'
  //   }
  //   // Add more episodes as needed
  // ];

  // return (
  //   <div>
  //     <VideoPlayer episodes={episodes} />
  //   </div>
  // );
};

export default App;
