import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  label,
  name,
  rows,
  value,
  defaultValue,
  onChange,
  error
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getValidClass = () => {
    return 'form-control ' + (error ? 'is-invalid' : '');
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        className={getValidClass()}
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
      ></textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
};

export default TextArea;
