const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data){
  let errors = {};

  data.token = !isEmpty(data.token) ? data.token : "";
  data.ticker = !isEmpty(data.ticker) ? data.ticker : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";

  if (Validator.isEmpty(data.token))
  {
    errors.token = "Invalid token: please resend";
  }

  if (Validator.isEmpty(data.ticker))
  {
    errors.ticker = "Please enter a ticker";
  }

  if (Validator.isEmpty(data.quantity))
  {
    errors.quantity = "Please enter quantity to purchase"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};