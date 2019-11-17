const db = require("../server/quiries");

async function getitemData(response) {
  table_name = "products";

  // check if item exist data in data base
  const get_item_query = await db.quiries.getData(
    table_name,
    {},
    { barcode: response.barcode }
  );
  if (get_item_query.name === "error") {
    return {
      success: false,
      message: "db error",
      errors: ["something wrong on the input"]
    };
  }
  if (get_item_query === null) {
    return {
      success: false,
      message: "Doesn't exist in db",
      errors: ["Barcode doesn't exist"]
    };
  } else if (get_item_query) {
    return {
      success: true,
      result: get_user_query,
      message: "Successful"
    };
  }
}

exports.getitemData = getitemData;
