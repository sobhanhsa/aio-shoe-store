"use client"
import { CartItemType } from "@/utils/db/cartItem/model";
import styles from "./addToCartButton.module.css"
import { toast } from "react-toastify";

const addToCart = async(cartItem:CartItemType) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"cart",{
        method:"POST",
        body:JSON.stringify({
            ...cartItem
        })
    });
    return res
}

interface addToCartButtonParams {
    id:string
    colorName:string
    size:number
}

const  AddToCartButton = (params:addToCartButtonParams) => {
    const handleAddCart = () => {
        
        const userId = "66080c8426f9e94d1651ae23"

        const res = addToCart({
            spec:{
                productId:params.id,
                colorName:params.colorName,
                size:params.size,
                userId,
            },
            quantity:1,
        } as any);

        const toastRes = new Promise((resolve,reject) => {
            res.then(
                r => !r.ok 
                ? reject("duplicated cart item") 
                : resolve("success")
            )
        })

        toast.promise(toastRes,{
            pending:"در حال افزودن محصول به سبد خرید",
            success:"با موفقیت افزوده شد",
            error:"این محصول قبلا افزوده شده است"
        })

    }
    return (
        <button className={styles.addButton} onClick={handleAddCart}>
        افزودن به سبد خرید 
        </button>   
    )
};

export default AddToCartButton;