const app = require('express')();
const bodyParser = require('body-parser');
const authMiddleware = require('./middlewares/auth')
const cors = require("cors");

// ======================= configuration =======================
app.use(bodyParser.json());

// =========================== CORS ============================

app.use(cors({ origin: `*`, credentials: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `*`); //A response that tells the browser to allow requesting code from the origin http://localhost:5000:3000 to access a resource
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

app.use(authMiddleware);

require('./routes/user')(app);
require('./routes/cards')(app);
require('./routes/order')(app);
require('./routes/payment')(app);

app.get("/ping",(req,res) => res.send("ping"))

console.log("in app.js");

module.exports = app;
