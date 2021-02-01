const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = isEmpty(data.handle) ? "" : data.handle;
  data.status = isEmpty(data.status) ? "" : data.status;
  data.skills = isEmpty(data.skills) ? "" : data.skills;
  data.website = isEmpty(data.website) ? "" : data.website;
  data.youtube = isEmpty(data.youtube) ? "" : data.youtube;
  data.twitter = isEmpty(data.twitter) ? "" : data.twitter;
  data.linkedin = isEmpty(data.linkedin) ? "" : data.linkedin;
  data.instagram = isEmpty(data.instagram) ? "" : data.instagram;

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Le champs handle doit comporté 2 à 40 caractères !";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Le champs handle ne doit pas êtres vide  !";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Le champs status ne doit pas êtres vide  !";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Le champs skills ne doit pas êtres vide  !";
  }

  if (!Validator.isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Le champs website n'est pas valide  !";
    }
  }

  if (!Validator.isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Le champs youtube n'est pas valide  !";
    }
  }

  if (!Validator.isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Le champs twitter n'est pas valide  !";
    }
  }
  if (!Validator.isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Le champs linkedin n'est pas valide  !";
    }
  }
  if (!Validator.isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Le champs instagram n'est pas valide  !";
    }
  }

  return {
    errors,
    isValide: isEmpty(errors),
  };
};
