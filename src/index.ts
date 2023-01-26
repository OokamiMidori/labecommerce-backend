import { users, purchases, products, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { Categorias } from "./types";

// console.log(users)
// console.log(products)
// console.log(purchases)
console.log(createUser("u003","pedrinho@labenu.com", "pp123"))
console.log(getAllUsers())
console.log(createProduct("p004", "MonitorHd", 800, Categorias.MONITORES))
console.log(getAllProducts())
console.log(getProductById("p004"))
console.log(queryProductsByName("MonitorHD"))
console.log(createPurchase("u003", "p004", 2, 1600))
console.log(getAllPurchasesFromUserId("u002"))