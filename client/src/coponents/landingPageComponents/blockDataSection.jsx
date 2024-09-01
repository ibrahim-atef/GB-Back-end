import React from "react";
import "./BlockData.scss";

const BlockData = ({ title, imgSrc, direction = "left", desc }) => {
  return (
    <section className={`section-two-Block-Data ${direction}`}>
      <div className="content">
        <h2>{title}</h2>
        {desc && <p className="desc">{desc}</p>}
      </div>
      <div className="image">
        <img src={imgSrc} alt={title} />
      </div>
    </section>
  );
};

export default BlockData;
