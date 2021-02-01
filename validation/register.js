const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Le nom doit contenir entre 2 et 30 caractères !";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Le champs Nom est obligatoire !";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "La valeur du champs Email est invalide !";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Le champs Email est obligatoire !";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Le champs Mot de passe est obligatoire !";
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = "Le champs mot de passe est obligatoire !";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Le champs confirmation mot de passe est obligatoire !";
  }

  if (!Validator.equals(data.password2, data.password)) {
    errors.password2 = "Les mots de passe ne correspondent pas !";
  }

  return {
    errors,
    isValide: isEmpty(errors),
  };
};
