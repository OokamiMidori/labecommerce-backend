import { users, purchases, products, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { Categorias, TUser } from "./types";
import express, { Request, Response } from 'express';
import cors from "cors"


// console.log(users)
// console.log(products)
// console.log(purchases)
// console.log(createUser("u003","pedrinho@labenu.com", "pp123"))
// console.log(getAllUsers())
// console.log(createProduct("p004", "MonitorHd", 800, Categorias.MONITORES))
// console.log(getAllProducts())
// console.log(getProductById("p004"))
// console.log(queryProductsByName("MonitorHD"))
// console.log(createPurchase("u003", "p004", 2, 1600))
// console.log(getAllPurchasesFromUserId("u002"))

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(getAllUsers())
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(getAllProducts())
})

app.get("/product/search", (req: Request, res: Response) => {
    let name = req.query.q as string
    res.status(200).send(queryProductsByName(name))
})

app.post("/users", (req: Request, res: Response) => {

    const id = req.body.id
    const email = req.body.email
    const password = req.body.password
    createUser(id, email, password)

    res.status(201).send("Cadastro realizado com sucesso")
})

app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    createProduct(id, name, price, category)

    res.status(201).send("Produto cadastrado com sucesso")
})

app.post("/purchases", (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    createPurchase(userId, productId, quantity, totalPrice)

    res.status(201).send("Compra realizada com sucesso")
})

app.get("/products/:id", (req: Request, res: Response) => {
    let id = req.params.id
    const result = products.find((product) => product.id === id)
    res.status(200).send(result)
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const id = req.params.id
    const result = getAllPurchasesFromUserId(id)
    res.status(200).send(result)
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const indexToRemove = users.findIndex((user) => user.id === id)
    if (indexToRemove) {
        users.splice(indexToRemove, 1)
    }

    res.status(200).send("Usuário deletado com sucesso")
})

app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = products.findIndex((product) => product.id === id)
    if (indexToRemove) {
        products.splice(indexToRemove, 1)
    }
    res.status(200).send("Produto deletado com sucesso")
})

app.put("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const userToEdit = users.find((user) => {
        return user.id === id
    })

    if (userToEdit) {
        userToEdit.id = newId || userToEdit.id
        userToEdit.email = newEmail || userToEdit.email
        userToEdit.password = newPassword || userToEdit.password
    }

    res.status(200).send("Cadastro atualizado com sucesso")
})

app.put("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as Categorias | undefined

    const productToEdit = products.find((product) => {
        return product.id === id
    })

    if (productToEdit) {
        productToEdit.id = newId || productToEdit.id
        productToEdit.name = newName || productToEdit.name
        productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice
        productToEdit.category = newCategory || productToEdit.category
    }

    res.status(200).send("Produto atualizado com sucesso")

})