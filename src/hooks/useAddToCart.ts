import { CartItemDtoType } from "@/utils/db/cartItem/model";
import { toast } from "react-toastify";


export const fetcher = async(
    cartItem:CartItemDtoType
) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"cart",{
        method:"POST",
        body:JSON.stringify({
            ...cartItem
        }),
        cache:"no-cache"
    });
    return res
} 

export const useAddToCart = async function(this:CartItemDtoType) {
        
    const cart = this;

    const res = fetcher(cart);
    

    const toastRes = new Promise((resolve,reject) => {
        res.then(
            // r => !r.ok 
            // ? reject("duplicated cart item") 
            // : resolve("success")
            (r) => {
                if (r.status === 401) reject(
                    "هنوز وارد حساب کاربری خود نشده اید"
                    );
                if (r.status !== 201) reject(
                    "مشکلی رخ داد !"
                )                

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