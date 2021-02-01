const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (!Validator.isEmail(data.email)) {
    errors.email = "La valeur du champs Email est invalide !";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Le champs Email est obligatoire !";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Le champs Mot de passe est obligatoire !";
  }

  if (!Validator.isLength(data.password, { min: 3, max: 30 })) {
    errors.password =
      "Le champs mot de passe doit comporté 3 à 30 caractères !";
  }

  return {
    errors,
    isValide: isEmpty(errors),
  };
};
