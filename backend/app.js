const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const server = express();
const cors = require('cors');


server.use(bodyParser.json());
server.use(cors());



//Establish the database connection

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Sandy12!",
    database:"employees"

});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

//Establish the Port

  server.listen(9900,function check(error) {
    if (error) 
    {
    console.log("Error....dddd!!!!");
    }

    else 
    {
        console.log("Started....!!!! 9900");

    }
});

 
// // //Create the Records

server.post("/api/cus", (req, res) => {
    let details = {
      id:req.body.id,
      name: req.body.name,
      address : req.body.address,
      city: req.body.city,
      pc: req.body.pc,
      country: req.body.country

  
    };

    let sql = "INSERT INTO cusdetails SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Employee created Failed" });
      } else {
        res.send({ status: true, message: "Employee created successfully" });
      }
    });
  });


// // //view the Records

server.get("/api/cus", (req, res) => {
    var sql = "SELECT * FROM cusdetails";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


// // //Search the Records

server.get("/api/cus/:id", (req, res) => {
    var cusID = req.params.id;
    var sql = "SELECT * FROM cusdetails WHERE id=" + cusID;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });



// // //Update the Records

server.put("/api/cus/:id", (req, res) => {
    let sql =
      "UPDATE cusdetails SET name='" +
      req.body.name +
      "', address='" +
      req.body.address +
      "',city='" +
      req.body.city +
      "',pc='" +
      req.body.pc +
      "',country='" +
      req.body.country +

      
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Employee Updated Failed" });
      } else {
        res.send({ status: true, message: "Employee Updated successfully" });
      }
    });
  });



// //   //Delete the Records

  server.delete("/api/cus/:id", (req, res) => {
    let sql = "DELETE FROM cusdetails WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Employee Deleted Failed" });
      } else {
        res.send({ status: true, message: "Employee Deleted successfully" });
      }
    });
  });