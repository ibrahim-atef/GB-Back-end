import React, { useEffect, useState } from "react";
import SectionOne from "../coponents/landingPageComponents/SectionOne";
import Header from "../coponents/utilitiesCpmponents/header/Header";
import Footer from "../coponents/utilitiesCpmponents/footer/Footer.jsx";
import BlockData from "../coponents/landingPageComponents/blockDataSection";
import FaqSection from "../coponents/landingPageComponents/FaqSection";
import { API_BASE_URL } from "../../src/constants.js";
const LandingPage = () => {
  const [landingBlocks, setLandingBlocks] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/landingBlocks/AllLandingPageData`
        );
        const data = await response.json();

        setLandingBlocks(data.landingBlocks);

        // Transform FAQ data to match AccordionComponent's expected structure
        const formattedFaqs = data.faqs.map((faq) => ({
          title: faq.question,
          children: faq.answer,
        }));

        setFaqs(formattedFaqs);
      } catch (error) {
        console.error("Error fetching landing page data:", error);
      }
    };

    fetchLandingPageData();
  }, []);

  return (
    <div>
      <Header isLandingPage={true} />
      <SectionOne />
      {landingBlocks.map((block, index) => (
        <BlockData
          key={block._id}
          title={block.title}
          imgSrc={`${API_BASE_URL}${block.imgUrl}`}
          desc={block.desc}
          direction={index % 2 === 0 ? "right" : "left"}
        />
      ))}
      <FaqSection faqItems={faqs} />
      <Footer />
    </div>
  );
};

export default LandingPage;
