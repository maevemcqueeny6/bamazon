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
  // DisplayProducts();
  // // bidOnProducts();
});

// Step One: Display the Database information 
DisplayProducts = function() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      // console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    // console.log("-----------------------------------");
//     bidOnProducts(res);
//   });
// }

// function bidOnProducts(results) {
//   console.log("RESULTS", results);
inquirer
.prompt([
  {
  name: "itemID",
  type: "list",
  choices: function(answers) {
    // console.log(res);
    var choices = [];
    for (var i = 0; i < res.length; i++) {
      choices.push(
        {
          name: res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity,
          value: res[i].id
        }
        );
    }
    // console.log(choices);
    return choices;
      // for (var i = 0; i < answers.length; i++) {
      //   // how do i make sure the ChoiceArr becomes updates with the res[i] information
      //   choiceArr.push(parseInt(answers[i].id));
      //   console.log(choiceArr);
      // }
      // return choiceArr;
  },
  message: "Choose the ID of the item you would like to buy"
},
{
  type: "number",
  name: "quantity",
  message: "How many units would you like to buy?"
}
])
.then(function(answers){
  console.log(answers);

  // for (var i=0; i < res.length; i++){
  //   choiceArr===res[i];
  //   console.log(choiceArr);
  // };
  // console.log(answers, choiceArr);
  var itemID = answers.itemID;
  var quantity = answers.quantity;

  connection.query("SELECT * FROM products WHERE id = ?", [itemID], function (err, innerRes){

  if (quantity > innerRes[0].stock_quantity){
    console.log("insufficient quantity");
  }
  else {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?", [quantity, itemID], function(err, updateRes) {

    // Shows purchase total and running total of session's order
    console.log("Your purchase total is $" + (innerRes[0].price * quantity).toFixed(2));
  });
  }
});
  // processOrder(answers);
})
  
  }
  )}

  DisplayProducts();

// function processOrder(itemID, quantity){
//   let stock = 0;
//   connection.query("SELECT * FROM products WHERE id = ?", [itemID], function (err, res){
//       if (err) throw err;
//       else {
//           stock = res[0].stock_quantity;
//           if (stock < quantity) {
//               console.log("Oops! We don't have enough of this item to fill your order");
//               bidOnProducts();
//           }
//           else {
//               update(res[0].id, stock, number, res[0].price, number * res[0].price);
//           }
//       };
//   });



// // Step Two: Ask user which product Id they want and how much from the stock quantity
// // function bidOnProducts(results) {
// //   console.log("RESULTS", results);
//     // inquirer
//     //   .prompt([
//     //     {
//     //       name: "productID",
//     //       type: "rawlist",
//     //       choices: function () {
//     //         var choiceArray = [];
//     //         for (var i = 0; i < results.length; i++) {
//     //           choiceArray.push(results[i].item_name);
//     //         }
//     //         return choiceArray;
//     //       },
//     //       message: "What is the ID of the product you would like to buy"
//     //     },
//     //     {
//     //       name: "qunatity",
//     //       type: "input",
//     //       message: "How much of this product would you like?",
//     //       validate: function (value) {
//     //         if (isNaN(value) === false) {
//     //           return true;
//     //         }
//     //         return false;
//     //       }
//     //     }
//     //   ])
//     // .then(function(answer){
//     //   var chosenItem;
//     //   for (var i=0; i<results.length; i++){
//     //     if (results[i].item_name === answer.choice) {
//     //       chosenItem = results[i];
//     //     }
//     //   }

//     //   if (chosenItem.stock_quantity > parseInt(answer.stock_quantity)) {
//     //     connection.query(
//     //       "UPDATE auctions SET ? WHERE ?",
//     //       [
//     //         {
//     //           // figure this part out 
//     //           // (chosenItem.stock_quantity - answer.stock_quantity)
//     //         },
//     //         {
//     //           // What does this even do
//     //           // id: chosenItem.id
//     //         }
//     //       ],
//     //       function(error) {
//     //         if (error) throw err;
//     //         console.log("Item ordered successfully!");
//     //       }
//     //     )
//     //   }
//     //   else {
//     //     console.log("Order too large to be filled at this time. Try again...");
//     //   }

//     // })}

// // Step Four: Update SQL with new product quantity 

//   }
