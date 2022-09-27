import { React, useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, name, value, onChange, type, error }) => {
  const [revealPassword, setRevealPassword] = useState(false);
  const getValidClass = () => {
    return 'form-control ' + (error ? 'is-invalid' : 'is-valid');
  };

  const toggleRevealPassword = () => {
    setRevealPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          type={revealPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={getValidClass()}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleRevealPassword}
          >
            {revealPassword ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )}
          </button>
        )}
        {error ? (
          <div className="invalid-feedback">{error}</div>
        ) : (
          <div className="valid-feedback">Done!</div>
        )}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  error: PropTypes.string
};

export default TextField;
