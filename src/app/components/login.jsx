import { React, useState, useEffect } from 'react';
import TextField from './textField';
import { validator } from '../utils/validator';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна к заполненнию'
      },
      isEmail: {
        message: 'Адрес электронной почты введен не корркетно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен к заполнению'
      },
      isContainCapital: {
        message: 'Пароль должен содержать заглавные буквы'
      },
      isContainDigits: {
        message: 'Пароль должен содержать цифры'
      },
      minSymbols: {
        message: 'Пароль должен быть не менее 8 символов',
        value: 8
      }
    }
  };
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      console.log(errors);
      return;
    }
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Пароль"
              name="password"
              value={data.password}
              onChange={handleChange}
              type="password"
              error={errors.password}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;