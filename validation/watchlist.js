const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data){
  let errors = {};

  data.token = !isEmpty(data.token) ? data.token : "";
  data.ticker = !isEmpty(data.ticker) ? data.ticker : "";

  if (Validator.isEmpty(data.token))
  {
    errors.token = "Invalid token: please resend";
  }

  if (Validator.isEmpty(data.ticker))
  {
    errors.ticker = "Please enter a ticker";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};