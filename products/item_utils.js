const db = require("../server/quiries");

const utils = {
  async getallItemData() {
    table_name = "products";

    // get all data
    const get_all_items_query = await db.quiries.getallData(table_name, {}, {});
    if (get_all_items_query.name === "error") {
      return {
        success: false,
        message: "db error",
        errors: ["something went wrong"]
      };
    } else if (get_all_items_query) {
      return {
        success:true,
        message:"Successful get data",
        result: get_all_items_query,
      };
    }
  }
};

exports.utils = utils;
