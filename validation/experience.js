const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperiencesInput(data) {
  let errors = {};

  data.title = isEmpty(data.title) ? "" : data.title;
  data.company = isEmpty(data.company) ? "" : data.company;
  data.from = isEmpty(data.from) ? "" : data.from;

  if (Validator.isEmpty(data.title)) {
    errors.title = "Le titre du travail est obligatoire !";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Le champs company est obligatoire !";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Le champs date est obligatoire !";
  }

  return {
    errors,
    isValide: isEmpty(errors),
  };
};
