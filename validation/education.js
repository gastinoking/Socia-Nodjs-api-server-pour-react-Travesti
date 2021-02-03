const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationsInput(data) {
  let errors = {};

  data.school = isEmpty(data.school) ? "" : data.school;
  data.degree = isEmpty(data.degree) ? "" : data.degree;
  data.from = isEmpty(data.from) ? "" : data.from;

  if (Validator.isEmpty(data.school)) {
    errors.school = "Le titre school est obligatoire !";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Le champs degree est obligatoire !";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Le champs date est obligatoire !";
  }

  return {
    errors,
    isValide: isEmpty(errors),
  };
};
