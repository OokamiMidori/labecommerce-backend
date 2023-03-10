-- Active: 1675028817031@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
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

CREATE TABLE purchases(
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    
    FOREIGN KEY (buyer) REFERENCES users(id)
);

INSERT INTO purchases (id,total_price,paid,delivered_at,buyer)
VALUES("pu001", 200, 0, NULL, "u001"),
("pu002", 1000, 0, NULL, "u001"),
("pu003", 400, 0, NULL, "u002"),
("pu004", 1200, 0, NULL, "u123"),
("pu005", 800, 0, NULL, "u002"),
("pu006", 300, 0, NULL, "u123");

SELECT * FROM purchases;

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;

CREATE TABLE purchases_product(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_product ( purchase_id,product_id,quantity)
VALUES ("pu001","p004",1),
("pu002","p005",1),
("pu003", "p004",2);


SELECT * FROM purchases
LEFT JOIN purchases_product
ON purchases_product.purchase_id = purchases.id
INNER JOIN products
ON purchases_product.product_id = products.id;
