export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, fieldData, config) {
    let validateStatus;
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof fieldData === 'boolean') {
          validateStatus = !fieldData;
        } else {
          validateStatus = fieldData.trim() === '';
        }
        break;
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        validateStatus = !emailRegExp.test(fieldData);
        break;
      }
      case 'isContainCapital': {
        const capitalRegExp = /[A-Z]+/g;
        validateStatus = !capitalRegExp.test(fieldData);
        break;
      }
      case 'isContainDigits': {
        const digitRegExp = /\d+/g;
        validateStatus = !digitRegExp.test(fieldData);
        break;
      }
      case 'minSymbols': {
        validateStatus = fieldData.length < config.value;
        break;
      }
      default:
        break;
    }

    if (validateStatus) {
      return config.message;
    }
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const err = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (err && !errors[fieldName]) {
        errors[fieldName] = err;
      }
    }
  }

  return errors;
}
