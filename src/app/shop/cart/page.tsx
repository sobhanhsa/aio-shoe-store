"use client"

import { RiDeleteBin7Line } from "react-icons/ri";
import styles from "./cartPage.module.css"
import { AiOutlineClose, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";
import { finalCartItem, findCartsByUserId } from "@/utils/db/cartItem/data";
import { CartItemType } from "@/utils/db/cartItem/model";
import useSWR from "swr";
import { commaEmbedder } from "@/utils/priceConventor/priceConventor";
import CartItem from "@/components/cartPage/cartItem/CartItem";

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
    const {data,isLoading,mutate,error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/cart`
    ,fetcher);
    
    return (
        <div className={styles.container}>
            <p className={styles.title}>
                سبد خرید{
                    data?.cartItems.length !== 0 && `(${data?.cartItems.length}مورد)`
                }
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
                {
                    data?.cartItems?.map((c:any) => (
                        <CartItem key={c._id} c={c} mutate={mutate}/>
                    ))
                }
            </div>
        </div>
    )
};

export default CartPage;