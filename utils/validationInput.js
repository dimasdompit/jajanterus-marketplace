export const validationInput = (value = '', regEx = '', message = '') => {
  if (!value) {
    return 'This field is required';
  }
  const regex = regEx;
  if (!regex.test(value)) {
    return message;
  }
  return null;
}