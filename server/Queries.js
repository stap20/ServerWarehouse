const db = require("../server/quiries");
const vl = require("../server/quiries");


async function addnewItem(
  name,
  description = "",
  bardcode,
  buyunitprice = 0,
  sellunitprice = 0,
  unitinstock = 0,
  unitonorder = 0,
  reorderlevel = 0
) {
  const product_check = {
    text: "select barcode from products where barcode = $1",
    values: [bardcode]
  };

  const query = {
    text:
      "INSERT INTO products(name, description, barcode, buyunitPrice, sellunitPrice, unitinStock, unitonOrder, reorderLevel) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
    values: [
      name,
      description,
      bardcode,
      buyunitprice,
      sellunitprice,
      unitinstock,
      unitonorder,
      reorderlevel
    ]
  };
  var results = {
    result: false,
    mesaage: ""
  };
  try {
    const res = await client.query(query);
    results.result = true;
    results.message = "insert item successful";
    return results;
  } catch (error) {
    const product_check = await client.query(email_check);
    if (product_check.rowCount > 0) {
      results.result = false;
      results.message = "item already exists";
    }
    return results;
  }
}

async function searchItem(bardcode) {
  const query = {
    text: "select * from products where barcode = $1",
    values: [bardcode]
  };

  try {
    const res = await client.query(query);

    if (res.rowCount > 0) {
      return res.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}




exports.addnewItem = addnewItem;
exports.searchItem = searchItem;
exports.getuserData = getuserData;
