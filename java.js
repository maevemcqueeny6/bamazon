var inquirer = require("inquirer");
var mysql = require("mysql");

var choiceArr = [];

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "LaLaLa#321",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

// Step One: Display the Database information 
DisplayProducts = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "itemID",
          type: "list",
          choices: function (answers) {
            var choices = [];
            for (var i = 0; i < res.length; i++) {
              choices.push(
                {
                  name: res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity,
                  value: res[i].id
                }
              );
            }
            return choices;
          },
          message: "Choose the ID of the item you would like to buy"
        },
        {
          type: "number",
          name: "quantity",
          message: "How many units would you like to buy?"
        }
      ])
      .then(function (answers) {
        console.log(answers);

        var itemID = answers.itemID;
        var quantity = answers.quantity;

        connection.query("SELECT * FROM products WHERE id = ?", [itemID], function (err, innerRes) {

          if (quantity > innerRes[0].stock_quantity) {
            console.log("insufficient quantity");
          }
          else {
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?", [quantity, itemID], function (err, updateRes) {

              // Shows purchase total and running total of session's order
              console.log("Your purchase total is $" + (innerRes[0].price * quantity).toFixed(2));
            });
          }
        });
      })

  }
  )
}

DisplayProducts();
