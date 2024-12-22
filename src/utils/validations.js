const validator = require("validator");

const vadlidateSignupData = (req) => {
  const { firstName, emailId, password } = req.body;

  if (!firstName) {
    throw new Error("Name is not valid!.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

const valiudateEditData = (req) => {
  const ALLOWED_EDIT_FIELDS = [
    "photoUrl",
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
