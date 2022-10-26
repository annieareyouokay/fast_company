import React, { useState, useEffect } from 'react';
import SelectField from '../form/selectField';
import TextArea from '../form/textArea';
import PropTypes from 'prop-types';
import API from '../../../api';
import { validator } from '../../../utils/validator';

const dataInit = {
  userId: '',
  content: ''
};

const AddCommentForm = ({ onSubmit }) => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(dataInit);
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Пользователь обязателен к заполненнию'
      }
    },
    content: {
      isRequired: {
        message: 'Введите ваш комментарий'
      }
    }
  };

  useEffect(() => {
    API.users.fetchAll().then((data) => {
      const usersList = data.map((user) => ({
        label: user.name,
        value: user._id
      }));
      setUsers(usersList);
    });
  }, []);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidate = validate();
    if (!isValidate) return;
    onSubmit(data);
    setData(dataInit);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectField
        name="userId"
        defaultOption="Выберите пользователя"
        value={data.userId}
        options={users}
        onChange={handleChange}
        error={errors.userId}
      />
      <TextArea
        label="Сообщение"
        name="content"
        rows="3"
        value={data.content}
        onChange={handleChange}
        error={errors.content}
      />
      <div className='d-flex justify-content-end'>
        <button type="submit" className="btn btn-primary">
          Опубликовать
        </button>
      </div>
    </form>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentForm;
