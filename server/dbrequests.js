function signup(
    email,
    password,
    firstname = "g",
    lastname = "g",
    joptitle = "g",
    displayname = "g"
  ) {
    const email_check = {
      text: "select email from user_login where email = $1",
      values: [email]
    };
  
    const query = {
      text:
        "INSERT INTO user_login(empolyee_id, email, password, firstname, lastname, jobtitle, displayname) VALUES(uuid_generate_v1(), $1, $2, $3, $4, $5, $6)",
      values: [email, password, firstname, lastname, joptitle, displayname]
    };
    var results = {
      result: false,
      mesaage: ""
    };
    try {
      const res = await client.query(query);
      results.result = true;
      results.message = "Signup successful";
    } catch (error) {
      const res_mail = await client.query(email_check);
      if (res_mail.rowCount > 0) {
        results.result = false;
        results.message = "Email already exists";
      }
    }
    return results;
  }