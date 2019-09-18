// in table orders, find user_id = decoded.email
    // if user is present then select * from cards table where card = req.cardnumber, 
    // in backend only update cardbalance if cardbalance is negative then return messgae not enouhg money
    // else update cardbalance in card table
    // also delete order in orders table using userid
    //  and then send res payment success
    
    //addorder

const con = require('../db');
var mysql = require("mysql");
var decodeToken = require("../token").decodeToken;

let payment = (req, res)=>{
    console.log("Inside post payment");
    console.log("total: "+req.body.total)
    console.log("headers: "+req.headers)
    console.log("token from headers: "+req.headers.token);
    var decoded = decodeToken(req.headers.token);
    console.log("decoded token1: "+decoded.email);
    console.log("EXIT!!!");

    if (!req.body.number) {
        res.status(200).send({message: "Please provide required fields"});
    } else{

    // var sql_finduserinorders = "SELECT * FROM orders WHERE USER_ID="+mysql.escape(decoded.email);
    // var sql_findcardwrtorder = "SELECT * FROM cards WHERE CARD_NUMBER="+mysql.escape(req.body.number);
    // var sql_updatecardbalance = "UPDATE cards SET CARD_BALANCE="+newBalance+" WHERE CARD_NUMBER="+mysql.escape(req.body.number);
    // var sql_deletecompletedorder = "DELETE FROM orders WHERE USER_ID="+mysql.escape(decoded.email);

    var sql_finduserinorders = "SELECT * FROM orders WHERE USER_ID="+mysql.escape(decoded.email);
        console.log(sql_finduserinorders)
        con.query(sql_finduserinorders, function(err, row1){
        if(err){
            res.status(400).send({error_message:"This is an error message from the server while finding users order"})
        }
        else{
            console.log("users order present.. fetching whether enough card balance")
            var sql_findcardwrtorder = "SELECT * FROM cards WHERE CARD_NUMBER="+mysql.escape(req.body.number);
            con.query(sql_findcardwrtorder, function(err, row2){
                if(err){
                    res.status(400).send({error_message:"This is an error message from the server while finding users card details"})
                }
                else{
                    console.log("card found.. calculating balance.. ");
                    const newBalance = row2[0].CARD_BALANCE - row1[0].COST;
                    if (newBalance < 0){
                        res.status(200).json({message: "not enough money"})
                    } 
                    else{
                        //UPDATE QUERY> DELETE FROM ORDERS>SEND
                        console.log("card has enough balance, lets pay and update balance");
                        var sql_updatecardbalance = "UPDATE cards SET CARD_BALANCE="+newBalance+" WHERE CARD_NUMBER="+mysql.escape(req.body.number);
                        con.query(sql_updatecardbalance, function(err, row3){
                            if(err){
                                res.status(400).send({error_message:"This is an error message from the server while updating card balance"})
                            }
                            else{
                                console.log("card balance updated, lets delete order");
                                var sql_deletecompletedorder = "DELETE FROM orders WHERE USER_ID="+mysql.escape(decoded.email);
                                con.query(sql_deletecompletedorder, function(err, row3){
                                    if(err){
                                        res.status(400).send({error_message:"This is an error message from the server while deleting users order"})
                                    }
                                    else{
                                        console.log("order deleted, lets send success delivered response");
                                        res.status(200).send({"message": "payment done successfully"});
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    })
}
}

module.exports = {payment}