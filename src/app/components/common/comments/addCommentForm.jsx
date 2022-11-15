import React, { useState } from 'react';
import TextArea from '../form/textArea';
import PropTypes from 'prop-types';
import { validator } from '../../../utils/validator';

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    content: {
      isRequired: {
        message: 'Введите ваш комментарий'
      }
    }
  };

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
    setData({});
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea
        label="Сообщение"
        name="content"
        rows="3"
        value={data.content || ''}
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
