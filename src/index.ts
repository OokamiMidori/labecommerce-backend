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
    try {
        res.status(200).send(getAllUsers())
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/products", (req: Request, res: Response) => {
    try {
        res.status(200).send(getAllProducts())
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/product/search", (req: Request, res: Response) => {
    try {
        const name = req.query.q as string
        if (name.length < 1) {
            throw new Error("'name' deve possuir ao menos 1 caractere")
        }
        res.status(200).send(queryProductsByName(name))

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.post("/users", (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("'id' deve ser uma string")
            }
            const idExist = users.find((user) => user.id === id)
            if (idExist) {
                throw new Error("'id'já cadastrado")
            }
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new Error("'email' deve ser uma string")
            }
            const emailExist = users.find((user) => user.email === email)
            if (emailExist) {
                throw new Error("'email' já cadastrado")
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                throw new Error("'password' deve ser uma string")
            }
        }

        createUser(id, email, password)
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/products", (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("'id' precisa ser uma string")
            }
            const idExist = products.find((product) => product.id === id)
            if (idExist) {
                throw new Error("'id'já cadastrado")
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                throw new Error("'name' deve ser uma string")
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                throw new Error("'price' deve ser um number")
            }
        }
        if (category !== undefined) {
            if (typeof category !== "string") {
                throw new Error("'category' deve ser uma string")
            }
        }
        createProduct(id, name, price, category)
        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/purchases", (req: Request, res: Response) => {
    try {
        const userId = req.body.userId
        const productId = req.body.productId
        const quantity = req.body.quantity

        if (userId !== undefined) {
            if (typeof userId !== "string") {
                throw new Error("'userId' deve ser uma string")
            }
            const usuarioExiste = users.find((user) => user.id === userId)
            if (!usuarioExiste) {
                throw new Error("'idUsuario' inexistente.")
            }
        }
        if (productId !== undefined) {
            if (typeof productId !== "string") {
                throw new Error("'productId' deve ser uma string")
            }
            const productExist = products.find((product) => product.id === productId)
            if (!productExist) {
                throw new Error("'productId' inexistente")
            }
        }
        if (quantity !== undefined) {
            if (typeof quantity !== "number") {
                throw new Error("'quantity' deve ser um number")
            }
            if (quantity < 1) {
                throw new Error("'quantity' deve ser maior que 0")
            }
        }

        const valorItem = products.find((product) => product.id === productId)
        const totalPrice = (valorItem.price * quantity)


        createPurchase(userId, productId, quantity, totalPrice)

        res.status(201).send("Compra realizada com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/products/:id", (req: Request, res: Response) => {
    try {
        let id = req.params.id
        const result = products.find((product) => product.id === id)
        if (!result) {
            throw new Error("Produto não existe")
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = getAllPurchasesFromUserId(id)
        const userExist = users.find((user) => user.id === id)
        if (!userExist) {
            throw new Error("Usuario inexistente")
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const indexToRemove = users.findIndex((user) => user.id === id)
        if (!indexToRemove) {
            throw new Error("Usuario inexistente")
        }
        if (indexToRemove) {
            users.splice(indexToRemove, 1)
        }

        res.status(200).send("Usuário deletado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexToRemove = products.findIndex((product) => product.id === id)
        if (!indexToRemove) {
            throw new Error("produto inexistente")
        }
        if (indexToRemove) {
            products.splice(indexToRemove, 1)
        }
        res.status(200).send("Produto deletado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined
        const userToEdit = users.find((user) =>
            user.id === id
        )
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                throw new Error("'id' deve ser uma string")
            }
        }
        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                throw new Error("'email' deve ser uma string")
            }
        }
        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                throw new Error("'password' deve ser uma string")
            }
        }
        if (!userToEdit) {
            throw new Error("Usuario inexistente")
        }

        if (userToEdit) {
            userToEdit.id = newId || userToEdit.id
            userToEdit.email = newEmail || userToEdit.email
            userToEdit.password = newPassword || userToEdit.password
        }

        res.status(200).send("Cadastro atualizado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as Categorias | undefined

        const productToEdit = products.find((product) => {
            return product.id === id
        })
if(newId!==undefined){
    if(typeof newId !== "string"){
        throw new Error("'id' deve ser uma string")
    }
}
if(newName !== undefined){
    if(typeof newName !== "string"){
        throw new Error("'name' deve ser uma string")
    }
}
if(newPrice!==undefined){
    if(typeof newPrice !== "number"){
        throw new Error("'price' deve ser um number")
    }
}
if(newCategory!==undefined){
    if(typeof newCategory !== "string"){
        throw new Error("'category' deve ser uma string")
    }
}
if(!productToEdit){
    throw new Error("Produto inexistente")
}
        if (productToEdit) {
            productToEdit.id = newId || productToEdit.id
            productToEdit.name = newName || productToEdit.name
            productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice
            productToEdit.category = newCategory || productToEdit.category
        }

        res.status(200).send("Produto atualizado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})