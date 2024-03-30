"use client"

import { commaEmbedder } from "@/utils/priceConventor/priceConventor";
import { AiOutlineClose, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import styles from "./CartItem.module.css"
import Image from "next/image";
import { useEffect, useState } from "react";
import { finalCartItem } from "@/utils/db/cartItem/data";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const  CartItem = ({c,mutate}:{c:finalCartItem,mutate:()=>void}) => {
    const [currentQuantity,setCurrentQuantity] = useState(c.quantity);
    const [fixedCurrentQuantity] = useDebounce(currentQuantity,1500);
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL+"cart/"+c._id+"?quantity="+fixedCurrentQuantity,{
            method:"PATCH"
        })
        .then((res) => {
            mutate()
        })
    },[fixedCurrentQuantity])
    return (
        <div className={styles.container} key={c._id}>
            <div className={styles.delete}>
                <AiOutlineClose style={{cursor:"pointer"}} size={20} color="red"/>
            </div>
            <div className={styles.imageContainer}>
                <Image
                    src={c.product.images[0].image}
                    alt=""
                    fill
                />
            </div>
            <div className={styles.product}>
                <p className={styles.prodcutTitle}>
                    {c.product.name}
                </p>
                <div className={styles.prodcutSpecs}>
                    <p className={styles.prodcutSpec}>{c.spec.colorName}</p>
                    <p className={styles.prodcutSpec}>{c.spec.size}</p>
                </div>
            </div>
            <p className={styles.price}>
                {commaEmbedder(c.price)}
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
                {commaEmbedder(c.price * currentQuantity)}
            </p>
        </div>
    )
};

export default CartItem;