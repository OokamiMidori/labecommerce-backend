import { TProduct } from "./types";
import { TPurchase } from "./types";
import { TUser } from "./types";

export const users :TUser[] = [
    {
        id:"01",
        email:"midori@labenu.com",
        password:"12341234"
        },{
            id:"02",
            email:"ookami@labenu.com",
            password:"11223344"
    }
]

export const products :TProduct[]=[
    {

        id:"01",
        name:"Super Mouse inventado",
        price:112,
        category:"eletrônico"
    },{

        id:"02",
        name:"Super Teclado Inventado",
        price:155,
        category:"eletrônico"
    }
]

export const purchases :TPurchase[]=[
    {

        userId:"01",
        productId:"02",
        quantity: 2,
        totalPrice:310
    },{
        
        userId:"02",
        productId:"01",
        quantity: 3,
        totalPrice:336
    }
]