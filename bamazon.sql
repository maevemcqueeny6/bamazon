CREATE DATABASE BAMazon;

USE BAMazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(65,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tooth brush ", "dental", "4", "10"), ("floss ", "dental", "1", "10");

SELECT * FROM products;