//add,delete,fetch

const con = require('../db');
var mysql = require("mysql");
var decodeToken = require("../token").decodeToken;

let fetchcards = (req, res)=>{
    console.log("Inside post fetchcards");
    console.log("headers: "+req.headers)
    console.log("token from headers: "+req.headers.token);
    var decoded = decodeToken(req.headers.token);
    console.log("decoded token1: "+decoded.email);
    console.log("EXIT!!!");
    //select * from cards where user id = decoded.email

var sql_getuserscarddetails =
      "SELECT * FROM cards WHERE USER_ID="+mysql.escape(decoded.email);
      console.log(sql_getuserscarddetails)
    con.query(sql_getuserscarddetails, function(err, row){
        if(err){
            res.status(400).send({error_message:"This is an error message from the server while fetching users card details"})
        }
        else{
            console.log("card details are here: "+row);
            res.status(200).send(row);
        }
    })
}

let deletecard = (req, res)=>{
    console.log("Inside post deletecard");
    console.log("card number to be deleted: "+req.query.number);
    //select * from cards where user id = decoded.email

var sql_deleteuserscarddetails =
      "DELETE FROM cards WHERE CARD_NUMBER="+mysql.escape(req.query.number);
      console.log(sql_deleteuserscarddetails)
    con.query(sql_deleteuserscarddetails, function(err, row){
        if(err){
            res.status(400).send({error_message:"This is an error message from the server while deleting users card details"})
        }
        else{
            console.log("successfully deleted card details ");
            res.status(200).send({message: "successfully deleted card details"});
        }
    })
}

let addcard = (req, res)=>{
    console.log("Inside post addcard");
    var decoded = decodeToken(req.headers.token);
    console.log("decoded token1: "+decoded.email);

var sql_adduserscarddetails =
      "INSERT INTO cards (CARD_NUMBER, CARD_CVV, CARD_BALANCE, USER_ID) VALUES("+mysql.escape(req.body.number)+","+mysql.escape(req.body.cvv)+","+mysql.escape(req.body.balance)+","+mysql.escape(decoded.email)+")";
      console.log(sql_adduserscarddetails)
    con.query(sql_adduserscarddetails, function(err, row){
        if(err){
            res.status(400).send({error_message:"This is an error message from the server while deleting users card details"})
        }
        else{
            console.log("successfully added card details ");
            res.status(200).send({message: "successfully added card details"});
        }
    })
}



module.exports = {fetchcards, deletecard, addcard}