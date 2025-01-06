const validator = require("validator");

const vadlidateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  // const profilePhoto = req.files.profilePhoto;

  if (!firstName) {
    throw new Error("First name is not valid!.");
  } else if (!lastName) {
    throw new Error("Last name is not valid!.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  } else if (!req.files || req.files.length === 0) {
    return new Error("Please provide atleast one image!");
  }
};

const valiudateEditData = (req) => {
  const ALLOWED_EDIT_FIELDS = [
    "profilePhotos",
    "about",
    "firstName",
    "lastName",
    "gender",
    "age",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((k) =>
    ALLOWED_EDIT_FIELDS.includes(k)
  );
  return isEditAllowed;
};

module.exports = {
  vadlidateSignupData,
  valiudateEditData,
};
