import { React, useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import SelectField from '../common/form/selectField';
import API from '../../api';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  });
  const [qualities, setQualities] = useState([]);
  const [professions, setProfessions] = useState([]);
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
    },
    profession: {
      isRequired: {
        message: 'Поле профессия обязательно к заполнению'
      }
    },
    licence: {
      isRequired: {
        message: 'Необходимо подтвердить лицензионное сообщение'
      }
    }
  };
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
  };

  return (
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
      <SelectField
        label="Выберите вашу профессию"
        name="profession"
        value={data.profession}
        options={professions}
        defaultOption="Choose..."
        error={errors.profession}
        onChange={handleChange}
      />
      <RadioField
        label="Ваш пол"
        name="sex"
        value={data.sex}
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        onChange={handleChange}
      />
      <MultiSelectField
        label="Выберите подходящте качества"
        name="qualities"
        onChange={handleChange}
        options={qualities}
      />
      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
      >
        Подтверить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
