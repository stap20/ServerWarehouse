function item_namesHandler(key) {
  if (key === "item_name") return "name";
  else if (key === "item_code") return "itemCode";
  else if (key === "barcode") return "barcode";
  else if (key === "item_price") return "buyunitPrice";
  else if (key === "in_stock") return "unitinStock";
  else if (key === "patch_size") return "patchSize";
  else if (key === "shelf_life") return "expirationDate";
}

const handler = {
  itemName_jsonHandler(response) {
    key_names = Object.keys(response);
    json_str = JSON.stringify(response);
    //modifi json key names to fit with db
    key_names.forEach(function(key) {
      new_key = item_namesHandler(key);
      json_str = json_str.replace('"' + key + '":', '"' + new_key + '":');
      delete response.key;
    });

    return JSON.parse(json_str);
  }
};

exports.handler = handler;
