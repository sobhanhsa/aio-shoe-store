"use client"

import { RiDeleteBin7Line } from "react-icons/ri";
import styles from "./cartPage.module.css"
import { AiOutlineClose, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";
import { findCartsByUserId } from "@/utils/db/cartItem/data";
import { CartItemType } from "@/utils/db/cartItem/model";
import useSWR from "swr";

const fetcher = async(url:string) => {

    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message);
        
        throw error;

    }

    return data;

}


const  CartPage = () => {
    const [currentQuantity,setCurrentQuantity] = useState(1);
    const {data,isLoading,mutate,error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/cart`
    ,fetcher);
    console.log(error,data);
    return (
        <div className={styles.container}>
            <p className={styles.title}>
                سبد خرید(n مورد)
            </p>
            <div className={styles.top}>
                <div className={styles.trashCan}>
                    <RiDeleteBin7Line size={20} />
                </div>
                <p className={styles.photo}>
                    عکس  
                </p>
                <p className={styles.product}>
                    محصول     
                </p>
                <p className={styles.price}>
                    قیمت     
                </p>
                <div className={styles.quantity}>
                    تعداد
                </div>
                <p className={styles.subTotal}>
                    
                    قیمت نهایی
                </p>
            </div>
            <div className={styles.cartsContainer}>
                <div className={styles.cart}>
                    <div className={styles.delete}>
                        <AiOutlineClose style={{cursor:"pointer"}} size={20} color="red"/>
                    </div>
                    <div className={styles.imageContainer}>
                        <Image
                            src={"/noproduct.jpg"}
                            alt=""
                            fill
                        />
                    </div>
                    <p className={styles.product}>
                        کفش چرمی مردانه
                    </p>
                    <p className={styles.price}>
                        500,000
                    </p>
                    <div className={styles.quantity}>
                        <button onClick={() => {setCurrentQuantity((p) => {
                            return p === 1 ? 1 : p - 1
                        })}}>
                            <AiOutlineMinus size={20} />
                        </button>
                        {currentQuantity}
                        <button onClick={() => setCurrentQuantity(p => p + 1)}>
                            <MdOutlineAdd size={20}/>
                        </button>
                    </div>
                    <p className={styles.subTotal}>
                        750,000
                    </p>
                </div>
            </div>
        </div>
    )
};

export default CartPage;