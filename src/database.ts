import { TProduct } from "./types";
import { TPurchase } from "./types";
import { TUser } from "./types";
import { Categorias } from "./types"

export const users: TUser[] = [
    {
        id: "u001",
        email: "midori@labenu.com",
        password: "12341234"
    }, {
        id: "u002",
        email: "ookami@labenu.com",
        password: "11223344"
    }
]

export const products: TProduct[] = [
    {

        id: "p001",
        name: "Super Mouse inventado",
        price: 112.00,
        category: Categorias.PERIFERICOS
    }, {

        id: "p002",
        name: "Super Teclado Inventado",
        price: 155.00,
        category: Categorias.PERIFERICOS
    }
]

export const purchases: TPurchase[] = [
    {

        userId: "u001",
        productId: "p002",
        quantity: 2,
        totalPrice: 310.00
    }, {

        userId: "u002",
        productId: "p201",
        quantity: 3,
        totalPrice: 336.00
    }
]

export function createUser(id: string, email: string, password: string): string {
    const newUser = {
        id: id,
        email: email,
        password: password
    }

    users.push(newUser)
    return "Cadastro realizado com sucesso"
}

export function getAllUsers(): TUser[] {
    return users
}

export function createProduct(id: string, name: string, price: number, category: Categorias): string {
    const newProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)

    return "Produto cadastrado com sucesso"
}

export function getAllProducts(): TProduct[] {

    return products
}

export function getProductById(idToSearch: string): TProduct {
    let product: TProduct = {
        id: "",
        name: "",
        price: 0,
        category: Categorias.PECAS
    }
    products.map((item: TProduct) => {
        if (item.id = idToSearch) {
            product = item
        }
    }
    )

    return product
}

export function queryProductsByName(q: string): TProduct {
    let item = {
        id: "",
        name: "",
        price: 0,
        category: Categorias.PECAS
    }
    products.map((product) => {
        if (product.name = q) {
            item = product
        }
    })
    return item
}

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): string {
    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)
    return "Compra realizada com sucesso"
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase | any[] {
    let purchasesUser: TPurchase[] = []
    purchases.map((purchase) => {
        if (purchase.userId = userIdToSearch) {
            purchasesUser.push(purchase)
        }
    })
    return purchasesUser
}