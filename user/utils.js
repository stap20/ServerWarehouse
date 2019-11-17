const db = require("../server/quiries");
const vl = require("../server/validation");
const user_utils = {
  async getuserData(email, password = "") {
    table_name = "user_login";
    condition = { email: email };

    // check if user exist data in data base
    check_get_user_query = null;
    get_user_query = await db.quiries.getData(table_name, {}, condition);
    if (password !== "") {
      check_get_user_query = vl.validation.comparePassword(
        get_user_query.password,
        password
      );
    }
    if (get_user_query === null && check_get_user_query === null) {
      return {
        result: null,
        details: {
          success: false,
          message: "Doesn't exist in db",
          errors: ["invalid username or password"]
        }
      };
    } else if (get_user_query && check_get_user_query && password !== "") {
      return {
        result: get_user_query,
        details: {}
      };
    } else if (get_user_query && password === "") {
      return {
        result: get_user_query,
        details: {}
      };
    }
  },

  async getallUserData() {
    table_name = "user_login";

    // get all data
    const get_all_users_query = await db.quiries.getallData(
      table_name,
      { empolyee_id: null, email: null, firstname: null, lastname: null },
      {}
    );
    if (get_all_users_query.name === "error") {
      return {
        success: false,
        message: "db error",
        errors: ["something went wrong"]
      };
    } else if (get_all_users_query) {
      return {
        success: true,
        message: "Successful get data",
        result: get_all_users_query
      };
    }
  }
};

exports.user_utils = user_utils;
