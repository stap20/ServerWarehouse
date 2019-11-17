const pg = require("pg");
var jsonSql = require("json-sql")();

const url = {
  user: "postgres",
  host: "localhost",
  database: "storage_server",
  password: "123",
  port: 5432
};

function fixQuery(query_text) {
  var idx = query_text.indexOf("$p");
  while (idx >= 0) {
    first = query_text.substr(0, idx + 1);
    last = query_text.substr(idx + 2, query_text.length - 1);

    query_text = first + last;
    idx = query_text.indexOf("$p");
  }

  return query_text;
}

function queryGenerator(
  query_type,
  query_table,
  values_list,
  condition,
  modifiers
) {
  var sql = jsonSql.build({
    type: query_type,
    table: query_table,
    fields: Object.keys(values_list),
    values: values_list,
    condition: condition,
    modifier: modifiers
  });

  query = {
    text: fixQuery(sql.query),
    values: Object.values(sql.values)
  };
  return query;
}

// for connection information
var client = new pg.Client(url);
client.connect();

const quiries = {

  async insert(table,values) {
    try {
        const res = await client.query(queryGenerator("insert",table,values));
        if (res.rowCount > 0)
        return true;     
        else 
        return false;
    } 
    catch (error) {return error;}
  },
   
  async isExist(table,values,condition) {
    try {
        const res = await client.query(queryGenerator("select",table,values,condition));
        if (res.rowCount > 0)
        return true     
        else 
        return false;
    } 
    //for all catch must send to class to classifi error to get useful details about error
    catch (error) {return error;}
  },

  async getData(table,values,condition) {
    try {
        const res = await client.query(queryGenerator("select",table,values,condition));
        if (res.rowCount > 0)
            return res.rows[0];     
        else 
            return null;
    } 
    catch (error) {return error;}
  },

  async getallData(table,values,condition) {
    try {
        const res = await client.query(queryGenerator("select",table,values,condition));
        if (res.rowCount > 0)
            return res.rows;     
        else 
            return null;
    } 
    catch (error) {return error;}
  },

  async modifiData(table,condition,modifiers) {
    try {
        const res = await client.query(queryGenerator("update",table,{},condition,modifiers));
        if (res.rowCount > 0)
            return true;     
        else 
            return false;
    } 
    catch (error) {return error;}
  },

  async uuidGenerator() {
    return (await client.query("select uuid_generate_v1()")).rows[0].uuid_generate_v1;
  }
};

exports.quiries = quiries