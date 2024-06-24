"use client"
import { CartItemType } from "@/utils/db/cartItem/model";
import styles from "./addToCartButton.module.css"
import { toast } from "react-toastify";
import { useAddToCart } from "@/hooks/useAddToCart";


interface addToCartButtonParams {
    productId:string
    colorName:string
    size:number
}

const  AddToCartButton = (params:addToCartButtonParams) => {
    return (
        <button className={styles.addButton} onClick={useAddToCart.bind({
            spec:{
                ...params
            },
            quantity:1
        })}>
        افزودن به سبد خرید 
        </button>   
    )
};

export default AddToCartButton;