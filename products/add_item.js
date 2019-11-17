const db = require("../server/quiries");

async function addItem(response) {
  table_name = "products";

  // check item already exist in database or not
  const exist_res = await db.quiries.isExist(
    table_name,
    {},
    { barcode: response.barcode }
  );
  if (exist_res) {
    return {
      success: false,
      message: "Item already exist in db",
      errors: ["Item already exists"]
    };
  }
  // insert item data in data base
  const item_query_res = await db.quiries.insert(table_name, response);
  //error handler class
  if (item_query_res.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  // we don't need now item_query_res == null cuz we handle error in above if condition
  //jason in quieres class to detect db error
  if (item_query_res === null) {
    return {
      success: false,
      message: "Item already exist in db",
      errors: ["Item already exists"]
    };
  } else if (item_query_res) {
    return {
      success: true,
      message: "added successful"
    };
  }
}

exports.addItem = addItem;
