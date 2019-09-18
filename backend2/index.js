var CLIENT_URL = "http://localhost:3000";
var SERVER_URL = "http://localhost:3001";


var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
app.set("view engine", "ejs");
app.use(cors({ origin: `${CLIENT_URL}`, credentials: true }));
app.use(
    session({
      secret: "cmpe273_kafka_passport_mongo",
      resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
      saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
      duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
      activeDuration: 5 * 60 * 1000
    })
);
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", `${CLIENT_URL}`); //A response that tells the browser to allow requesting code from the origin http://localhost:3000 to access a resource
    res.setHeader("Access-Control-Allow-Credentials", "true"); //to allow cookies
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
  });

var auth=require("./routes/auth");
app.post("/login", auth.login);
app.post("/signup", auth.signup);

var card=require("./routes/cardmanagement");
app.post("/addcard", card.addcard);
app.post("/deletecard", card.deletecard);
app.get("/fetchcards", card.fetchcards);

var order=require("./routes/order");
app.post("/placeorder", order.placeorder);

var payment = require("./routes/payment");
app.post("/payment", payment.payment);

app.listen(3001);
console.log("Server Listening on port 3001");
module.exports=app;
