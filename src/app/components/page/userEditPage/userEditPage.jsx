import React, { useState, useEffect } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import { validator } from '../../../utils/validator';
import API from '../../../api';
import { useHistory, useParams } from 'react-router-dom';

const UserEditPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
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
    name: {
      isRequired: {
        message: 'Пароль обязателен к заполнению'
      }
    },
    profession: {
      isRequired: {
        message: 'Поле профессия обязательно к заполнению'
      }
    }
  };

  useEffect(() => {
    API.users.getById(id).then((user) => {
      setData({
        ...user,
        qualities: user.qualities.map((quality) => ({
          label: quality.name,
          value: quality._id
        })),
        profession: user.profession._id
      });
    });
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

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

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

    API.users.update(data._id, {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
    history.replace(`/users/${data._id}`);
  };

  const handleComeback = () => {
    history.replace(`/users/${data._id}`);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={handleComeback}>Назад</button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {data.name && professions.length ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
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
                label="Выберите подходящие качества"
                name="qualities"
                defaultValue={data.qualities}
                onChange={handleChange}
                options={qualities}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
