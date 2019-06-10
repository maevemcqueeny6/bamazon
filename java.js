var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "LaLaLa#321",
  database: "BAMazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();
  bidOnProducts();
});

// Step One: Display the Database information 
function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
  });
}

// Step Two: Ask user which product Id they want and how much from the stock quantity
function bidOnProducts(){
  inquirer
  .prompt([
    {
      name: "productID",
      type: "input",
      message: "What is the ID of the product you would like to buy"
    },
    {
      name: "qunatity",
      type: "input",
      message: "How much of this product would you like?",
      validate: function(value){
        if (isNaN(value) === false){
          return true;
        }
        return false;
      }
    }
  ])
}

// Step Three: Check to see if the store has enough quantity
