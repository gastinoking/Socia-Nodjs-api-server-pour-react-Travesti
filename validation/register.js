const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  const rep = Validator.isLength(data.name, { min: 2, max: 30 });
  console.log(rep);
  if (!rep) {
    errors.name = "Le nom doit contenir entre 2 et 30 caractères !";
  }
  return {
    errors,
    isValide: isEmpty(errors),
  };
};
