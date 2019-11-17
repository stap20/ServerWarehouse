const utils = require("./utils");

async function login(response) {
  table_name = "user_login";
/*
  errors_list = [];
  //check if email in valid format or not
  const validate_res = vl.validation.isValidEmail(response.email);
  if (!validate_res) {
    errors_list.push("Email isn't in valid fromat");
  }

  var password_validate_res = vl.validation.isValidPassword(response.password);
  if (password_validate_res.length > 0) {
    password_validate_res = vl.validation.correct_password_validationMessage(
      password_validate_res
    );
    errors_list = errors_list.concat(password_validate_res);
  }

  // input errors handler
  if (errors_list.length > 0) {
    return {
      result: null,
      details: {
        success: false,
        message: "invalid input format",
        errors: errors_list
      }
    };
  }
*/
  // check if user exist data in data base
  var login_res = await utils.user_utils.getuserData(response.email, response.password);
  if (login_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  if (login_res.result!==null){
    login_res.details = {
      success: true,
      message: "Welcome back " + response.email
    };
  }

  return login_res;
}

exports.login = login;
