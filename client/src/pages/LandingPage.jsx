import SectionOne from "../coponents/landingPageComponents/SectionOne";
import Header from "../coponents/utilitiesCpmponents/header/Header";
import BlockData from "../coponents/landingPageComponents/blockDataSection";

const LandingPage = () => {
  return (
    <div>
      <Header isLandingPage={true} />
      <SectionOne />
      <BlockData
        title="Enjoy on your TV."
        imgSrc="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
        desc="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
        
      />
    </div>
  );
};

export default LandingPage;
