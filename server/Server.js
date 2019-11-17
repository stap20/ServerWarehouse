//------------------------------ Requires session --------------------------------
//node js requires
var express = require("express");
var passport = require("passport");
LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");

//our files requires
var signup = require("../user/signup");
var login = require("../user/login");
var add_worker = require("../user/add_worker");
var vl = require("./validation");
const utils = require("../user/utils");
const items_utils = require("../products/item_utils");
const additem = require("../products/add_item");
const getitem = require("../products/search_item");
const inputHandler = require("../extra/inputHandler");
const modifiItem = require("../products/modifi_item");

//------------------------------ app.use() session --------------------------------
//Intiate Server App
var app = express();
//enable cross origin request
app.use(cors());
//Parses Request Body - TO DO LOOK INTO TWO BODY PARSER EFFECT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//define session variables
app.use(
  session({
    secret: "Shh, its a secret!",
    resave: true,
    saveUninitialized: true
  })
);
//passport local strategy definition
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      response = { email: email, password: password };
      login.login(response).then(user => {
        if (user.result) return done(null, user);
        else return done(null, false, { message: user.details });
      });
    }
  )
);
//intialize passport
app.use(passport.initialize());
//define passport session
app.use(passport.session());

//------------------------------ Other internal function session --------------------------------
//intialize serialize passport function
passport.serializeUser(function(user, done) {
  done(null, user.result.email);
});
//intialize deserialize passport function
passport.deserializeUser(function(email, done) {
  utils.user_utils.getuserData(email).then(userdata => {
    done(null, userdata.result);
  });
});

//------------------------------ Our internal function session --------------------------------
function set_passwordValidation(validation_list) {
  //check if password in valid format or not
  vl.validation.setpasswordValidator(validation_list);
}
//set password validation rules
set_passwordValidation(["min", "max"]);

//------------------------------ User handler requests session --------------------------------
//signup request
app.post("/signup", function(req, res) {
  console.log("request signup recieved");
  // Prepare output in JSON format
  response = {
    empolyee_id: "",
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };
  signup.signup(response).then(value => {
    res.send(value);
  });
});
//login request
app.post("/login", function(req, res, next) {
  console.log("request login recieved");
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(info.message);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.send(user.details);
    });
  })(req, res, next);
});

//addWorkers request
app.get("/addworkers", function(req, res) {
  console.log("request addworker recieved");'-'
  if (req.user) {
    // Prepare output in JSON format
    response = {
      super_id: req.user.empolyee_id,
      worker_uuid: "",
      login_code: "",
      firstname: req.body.firstname,
      lastname: req.body.lastname
    };
    add_worker.add_worker(response).then(value => {
      res.send(value);
    });
    res.send("success")
  } else {
    res.send({
      success: false,
      message: "Not register in db",
      errors: ["You are not register or LogedIn"]
    });
  }
});

//get all data all rows for users
app.post("/getallusers", function(req, res) {
  console.log("request getallusers recieved");
  utils.user_utils.getallUserData().then(value => {
    res.send(value);
  });
});
//------------------------------ Items handler requests session --------------------------------
//add new item request
app.post("/additem", function(req, res) {
  // Prepare output in JSON format
  console.log(req.body);
  console.log("request additem recieved");
  response = {
    name: req.body.item_name,
    itemCode: req.body.item_code,
    barcode: req.body.barcode,
    buyunitPrice: req.body.item_price,
    unitinStock: req.body.in_stock,
    patchSize: req.body.patch_size,
    expirationDate: req.body.shelf_life
  };
  additem.addItem(response).then(value => {
    res.send(value);
  });
});
//search exist item request
app.post("/getitem", function(req, res, next) {
  console.log("request getitem recieved");
  response = {
    barcode: req.body.barcode
  };
  getitem.getitemData(response).then(value => {
    res.send(value);
  });
});

//modifi item request
app.post("/modifiitem", function(req, res, next) {
  console.log("request modifiItem recieved");
  response = inputHandler.handler.itemName_jsonHandler(req.body);
  modifiItem.modifiitemData(response).then(value => {
    res.send(value);
  });
});

//get all data all rows for users
app.post("/getallitems", function(req, res) {
  console.log("request getallitems recieved");
  items_utils.utils.getallItemData().then(value => {
    res.send(value);
  });
});
//------------------------------ Other handler requests session --------------------------------
//defaullt request handler
app.get("/", function(req, res) {
  if (req.user) {
    res.send("You visited this page " + req.user.email + " times");
  } else {
    res.send("Welcome to this page for the first time!");
  }
});
//web page request
app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

//------------------------------ Server session --------------------------------
//server listner
var server = app.listen(5000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
