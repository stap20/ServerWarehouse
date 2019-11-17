const db = require("../server/quiries");
const server_utils = require("../extra/server_utils");
const vl = require("../server/validation");

async function add_worker(response) {
  table_name = "workers";

  // check login code already exist in database or not
  login_code = server_utils.serverUtils.generateLoginCode();
  exist_res = await db.quiries.isExist(
    table_name,
    {},
    { login_code: login_code }
  );
  while (exist_res) {
    login_code = server_utils.serverUtils.generateLoginCode();
    exist_res = await db.quiries.isExist(
      table_name,
      {},
      { login_code: login_code }
    );
  }
  response.login_code = login_code;
  // generate uuid
  const uuid = await db.quiries.uuidGenerator();
  response.worker_uuid = uuid;
  console.log("loooooooooool")
  // insert user data in data base
  const addworker_query_res = await db.quiries.insert(table_name, response);
  if (addworker_query_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  if (!addworker_query_res) {
    return {
      success: false,
      message: "Already exist in db",
      errors: [response.email + " " + "already exists"]
    };
  } else if (addworker_query_res) {
    return { success: true, message: "Worker added successful" };
  }
}

exports.add_worker = add_worker;
