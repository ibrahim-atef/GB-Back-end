import React from 'react';
import PropTypes from 'prop-types';
import './TextFieldComponent.scss';

const TextFieldComponent = ({
  hintText,
  prefixItem,
  value,
  onChange,
  onFocus,
  onBlur,
  type, // Add type prop
  ...props
}) => {
  return (
    <div className="text-field-component">
      {prefixItem && <div className="prefix">{prefixItem}</div>}
      <input
        type={type} // Use the type prop for the input type
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={hintText}
        {...props}
      />
    </div>
  );
};

TextFieldComponent.propTypes = {
  hintText: PropTypes.string,
  prefixItem: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string, // Add type prop to propTypes
};

TextFieldComponent.defaultProps = {
  hintText: '',
  prefixItem: null,
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  type: 'text', // Default type is 'text'
};

export default TextFieldComponent;
