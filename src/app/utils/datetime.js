export function createdAt(value) {
  const createdDate = new Date(Number(value));
  const difference = new Date().getTime() - Number(value);
  let result = '';

  if (difference <= 60000) {
    result = 'минуту назад';
  } else if (difference <= 300000) {
    result = '5 минут назад';
  } else if (difference <= 600000) {
    result = '10 минут назад';
  } else if (difference <= 1800000) {
    result = '30 минут назад';
  } else if (convertMsToDays(difference) === 0) {
    result = `${createdDate.getHours()}:${createdDate.getMinutes()}`;
  } else if (convertMsToDays(difference) < 365) {
    result = getDateFormat([createdDate.getDate(), createdDate.getMonth()]);
  } else if (convertMsToDays(difference) / 365 >= 1) {
    result = getDateFormat([
      createdDate.getDate(),
      createdDate.getMonth(),
      createdDate.getFullYear()
    ]);
  }

  return result;
}
const convertMsToDays = (milliseconds) =>
  Math.round(milliseconds / (24 * 60 * 60 * 1000));

const getDateFormat = (date, separator = '.') => {
  return date.map((date) => fillbyZeros(date)).join(separator);
};

const fillbyZeros = (num) => num.toString().padStart(2, '0');
