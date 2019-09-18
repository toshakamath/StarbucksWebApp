//login, signup
var generateToken = require("../token").generateToken;
const con = require('../db');
var mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let signup=function (req, res) {
    console.log("Inside post signup");
    console.log(req.body.name, req.body.username, req.body.password);
    var sql_checkifuserispresent =
      "SELECT * FROM users WHERE USER_ID=" + mysql.escape(req.body.username);
    console.log(req.body.username);
    console.log(sql_checkifuserispresent);
    con.query(sql_checkifuserispresent, function (err, row) {
      //console.log("rows: " + row);
      if (err) {
        res.status(400).send({error_message:"Server error while checking whether user is already present in the db"});
      } else {
        console.log("rows: ", row);
        if (row.length) {
          console.log("User already present");
          res.end(
            "User details already present in the database. Please login"
          );
        } else {
          console.log("User is not present in the db, therefore he is ready to sign up");
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            var sql =
              "INSERT INTO users (USER_ID, USER_NAME, PASSWORD_HASH) VALUES (" +
              mysql.escape(req.body.username) +
              "," +
              mysql.escape(req.body.name) +
              "," +
              mysql.escape(hash) +
              ")";
            con.query(sql, function (err, row) {
              if (err) {
                console.log("hashed value: ", hash);
                console.log("error in query storing");
                res.status(400);
              } else {
                console.log("USER SIGN UP SUCCESS ");
                console.log("hashed value: ", hash);
                res.status(200).send(row[0]);
              }
            });
          });
        }
      }
    });
  };

let login= function (req, res) {
    console.log("Inside post login");
    console.log(req.body.username, req.body.password);
    var sql_checkwhetheruserhassignedupbeforelogin =
      "SELECT * FROM users WHERE USER_ID=" + mysql.escape(req.body.username);
    con.query(sql_checkwhetheruserhassignedupbeforelogin, function(err, row){
        if(err){
            res.status(400).send({error_message:"This is an error message from the server while checking whether user has already signed up before login"})
        }
        else{
            console.log("rows: " + row.length);
        if (!row.length) {
            console.log("User is not present. Please sign up.");
            res.status(400);
          } else {
            bcrypt.compare(req.body.password, row[0].PASSWORD_HASH, function (err,result) {
              //if (row.length && row[0].password === req.body.password) {
              //if user is present in the db then login
              if (result) {
                delete row[0].PASSWORD_HASH;
                var token = generateToken(row[0].USER_ID);
                var returnobj = { userdata: row[0], token: token };
                console.log("returnobj: ",returnobj);
                console.log("TOKEN: ",returnobj.token);
                console.log("Login success");
                res.status(200).send(returnobj);
              } else {
                console.log("Username or password is incorrect");
                res.status(400).send({error_message:"Username or password is incorrect"});
              }
            });
          }
        }
    })
}


module.exports={signup, login};