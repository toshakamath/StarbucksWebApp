//addorder

const con = require('../db');
var mysql = require("mysql");
var decodeToken = require("../token").decodeToken;

let placeorder = (req, res)=>{
    console.log("Inside post placeorder");
    console.log("total: "+req.body.total)
    console.log("headers: "+req.headers)
    console.log("token from headers: "+req.headers.token);
    var decoded = decodeToken(req.headers.token);
    console.log("decoded token1: "+decoded.email);
    console.log("EXIT!!!");

var sql_inserttotalordercost =
      "INSERT INTO orders (USER_ID, COST) VALUES ("+mysql.escape(decoded.email)+","+ mysql.escape(req.body.total)+")";
      console.log(sql_inserttotalordercost)
    con.query(sql_inserttotalordercost, function(err, row){
        if(err){
            res.status(400).send({error_message:"This is an error message from the server while checking whether user has already signed up before login"})
        }
        else{
            console.log("order placed check db ");
            res.status(200).send({"message": "order placed"});
        }
    })
}

module.exports = {placeorder}