import { CartItemDtoType } from "@/utils/db/cartItem/model";
import { toast } from "react-toastify";


export const addToCart = async(
    cartItem:CartItemDtoType
) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"cart",{
        method:"POST",
        body:JSON.stringify({
            ...cartItem
        })
    });
    return res
} 

export const handleAddToCart = function(this:{
    spec:{
        productId:string,
        colorName:string,
        size:number,
    },
    quantity:number
}) {
        
    const cart = this;

    const res = addToCart(cart as any);

    const toastRes = new Promise((resolve,reject) => {
        res.then(
            // r => !r.ok 
            // ? reject("duplicated cart item") 
            // : resolve("success")
            (r) => {
                if (r.status === 401) reject("هنوز وارد حساب کاربری خود نشده اید")
                resolve("success")
            }
        )
    })

    toast.promise(toastRes,{
        pending:"در حال افزودن محصول به سبد خرید",
        success:"با موفقیت افزوده شد",
        error:{
            render({data}){
                return `${data}`
            }
        },
    })

}