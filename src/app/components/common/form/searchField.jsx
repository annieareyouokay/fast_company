import React from 'react';
import PropTypes from 'prop-types';

const SearchField = ({ name, placeholder, value, onChange, type }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="input-group">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  );
};

SearchField.defaultProps = {
  type: 'text'
};

SearchField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string
};

export default SearchField;
