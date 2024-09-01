import "./pageHeader.scss";
import bg from "../../assets/footer-bg.jpg";
import PropTypes from "prop-types";

const PageHeader = (props) => {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
      <h2 className="page-header__title">{props.children}</h2>
    </div>
  );
};

PageHeader.propTypes = {
  children: PropTypes.node,
};

export default PageHeader;
