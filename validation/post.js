const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostsInput(data) {
  let errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;
  data.name = isEmpty(data.name) ? "" : data.name;

  if (Validator.isEmpty(data.text)) {
    errors.text = "Le champs text est obligatoire !";
  }
  if (!Validator.isLength(data.text, { min: 3, max: 30 })) {
    errors.text = "Le champs text doit comporté 3 à 30 caractères !";
  }

  return {
    errors,
    isValide: isEmpty(errors),
  };
};
