"use client"
import { CartItemType } from "@/utils/db/cartItem/model";
import styles from "./addToCartButton.module.css"
import { toast } from "react-toastify";
import { useAddToCart } from "@/hooks/useAddToCart";


interface addToCartButtonParams {
    product:string
    colorId:string
    sizeId:string
}

const  AddToCartButton = (params:addToCartButtonParams) => {
    return (
        <button className={styles.addButton} onClick={useAddToCart.bind({
            product:params.product,
            spec:{
                color:params.colorId,
                size:params.sizeId
            },
            quantity:1
        })}>
        افزودن به سبد خرید 
        </button>   
    )
};

export default AddToCartButton;