/* eslint-disable prettier/prettier */
const validateExtension = extension => {
  if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
    return true;
  }
  return false;
};

module.exports = {
  validateExtension,
};
