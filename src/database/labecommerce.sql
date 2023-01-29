-- Active: 1675028817031@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id,email,password)
VALUES ("u001", "fada@email.com", "mila123"),
("u002","midori@email.com", "midori123"),
("u003", "ookami@email.com", "verde123");

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id,name,price,category)
VALUES("p001", "Monitor HD", 800, "MONITORES"),
("p002", "Mouse NAGA", 1200, "PERIFERICOS"),
("p003", "Teclado Mecanico", 300, "PERIFERICOS"),
("p004","SSD 120GB", 130, "PECAS"),
("p005","Monitor LED", 1000, "MONITORES");

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name LIKE "monitor%";

INSERT INTO users (id,email,password)
VALUES("u004","salzita@email.com","salepimenta");

INSERT INTO products (id,name,price,category)
VALUES("p006","Memoria DDR4 8GB", 128, "PECAS");

SELECT * FROM products
WHERE id LIKE "%6";

DELETE FROM users
WHERE id = "u004";

DELETE FROM products
WHERE id = "p006";

UPDATE users
SET id = "u123"
WHERE id = "u003";

UPDATE products
SET price = 200
WHERE id = "p004";

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
LIMIT 20
OFFSET 0;

SELECT * FROM products
WHERE price >= 100
AND price <= 300
ORDER BY price ASC;