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