import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Accordion/Accordion.scss';

const AccordionComponent = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${openIndex === index ? 'open' : ''}`}
        >
          <div
            className={`accordion-header ${openIndex === index ? 'open' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <span className="accordion-title">{item.title}</span>
            <div className={`accordion-toggle ${openIndex === index ? 'open' : ''}`}>
              {openIndex === index ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          {openIndex === index && (
            <div className="accordion-content">
              {item.children}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

AccordionComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default AccordionComponent;
