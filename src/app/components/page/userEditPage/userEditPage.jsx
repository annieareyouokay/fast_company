import React, { useState, useEffect } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import { validator } from '../../../utils/validator';
import { useHistory } from 'react-router-dom';
import { useProfessions } from '../../../../hooks/useProfessions';
import { useQualities } from '../../../../hooks/useQualities';
import { useAuth } from '../../../../hooks/useAuth';

const UserEditPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const { currentUser, isLoading: userLoading, updateUser } = useAuth();
  const { professions, isLoading: professionsLoading } = useProfessions();
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));
  const { qualities, getQuality, isLoading: qualitiesLoading } = useQualities();
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
    color: q.color
  }));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(currentUser);
    setData({
      ...currentUser,
      qualities: currentUser.qualities.map((id) => {
        const quality = getQuality(id);
        return {
          label: quality.name,
          value: quality._id
        };
      })
    });
    setIsLoading(false);
  }, []);

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

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  let isValid = Object.keys(errors).length === 0;

  // const getProfessionById = (id) => {
  //   for (const prof of professions) {
  //     if (prof.value === id) {
  //       return { _id: prof.value, name: prof.label };
  //     }
  //   }
  // };
  // const getQualities = (elements) => {
  //   const qualitiesArray = [];
  //   for (const elem of elements) {
  //     for (const quality in qualities) {
  //       if (elem.value === qualities[quality].value) {
  //         qualitiesArray.push({
  //           _id: qualities[quality].value,
  //           name: qualities[quality].label,
  //           color: qualities[quality].color
  //         });
  //       }
  //     }
  //   }
  //   return qualitiesArray;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid = validate();
    if (!isValid) return;

    updateUser({ ...data, qualities: data.qualities.map(q => (q.value)) });
    history.replace(`/users/${data._id}`);
  };

  const handleComeback = () => {
    history.goBack();
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={handleComeback}>
        Назад
      </button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          { !isLoading && !professionsLoading && !qualitiesLoading && !userLoading ? (
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
                label="Выберите подходящие качества"
                name="qualities"
                defaultValue={data.qualities}
                onChange={handleChange}
                options={qualitiesList}
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
