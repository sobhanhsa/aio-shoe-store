"use client"
import { CartItemType } from "@/utils/db/cartItem/model";
import styles from "./addToCartButton.module.css"
import { toast } from "react-toastify";
import { handleAddToCart } from "@/hooks/addCart";


interface addToCartButtonParams {
    productId:string
    colorName:string
    size:number
}

const  AddToCartButton = (params:addToCartButtonParams) => {
    return (
        <button className={styles.addButton} onClick={handleAddToCart.bind({
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