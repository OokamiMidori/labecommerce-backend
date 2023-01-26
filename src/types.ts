 //É a pessoa  cliente cadastrada.
 export type TUser = {   
    id:string,
    email:string,
    password:string
}

//É o produto cadastrado
export type TProduct = {

    id:string,
    name:string,
    price:number,
    category:Categorias
}

//É a compra realizada por cliente.
export type TPurchase = {
    userId:string,
    productId:string,
    quantity: number,
    totalPrice:number
}


export enum Categorias {
    MONITORES = "MONITORES",
    PERIFERICOS = "PERIFERICOS",
    PECAS = "PEÇAS"
}