import { React, useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useQualities } from '../../../hooks/useQualities';
import { useProfessions } from '../../../hooks/useProfessions';
import { useAuth } from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  });
  const { signUp } = useAuth();
  const { qualities } = useQualities();
  const qulitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
  const { professions } = useProfessions();
  const professionsList = professions.map(p => ({ label: p.name, value: p._id }));
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
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;

    try {
      await signUp({
        ...data,
        profession,
        qualities: qualities.map(e => (e.value))
      });
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
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
        options={professionsList}
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
        defaultValue={data.qualities}
        onChange={handleChange}
        options={qulitiesList}
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
