"use client"

import { commaEmbedder } from "@/utils/priceConventor/priceConventor";
import { AiOutlineClose, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import styles from "./CartItem.module.css"
import Image from "next/image";
import { useEffect, useState } from "react";
import { finalCartItem } from "@/utils/db/cartItem/data";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { CartItemType, PopulatedCartItemType } from "@/utils/db/cartItem/model";
import { IoMdColorPalette } from "react-icons/io";
import { ImEnlarge2 } from "react-icons/im";
import Link from "next/link";

const  CartItem = (
    {
        c,
        mutate
    }:{
        c:PopulatedCartItemType,
        mutate:()=>void
    }
) => {

    const [currentQuantity,setCurrentQuantity] = useState(c.quantity);
    const [fixedCurrentQuantity] = useDebounce(currentQuantity,1500);
    
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL+"cart/"+c._id+"?quantity="+fixedCurrentQuantity,{
            method:"PATCH"
        })
        .then((res) => {
            mutate()
        })
    },[fixedCurrentQuantity]);

    const handleDelete = () => {
        fetch(process.env.NEXT_PUBLIC_API_URL+"cart/"+c._id,{
            method:"DELETE"
        })
        .then((res) => {
            mutate()
        })
    };
    
    return (
        <div className={styles.container} key={c._id}>
            <div className={styles.delete} onClick={handleDelete}>
                <AiOutlineClose style={{cursor:"pointer"}} size={20} color="red"/>
            </div>
            <div className={styles.imageContainer}>
                <Link href={`/shop/${c.product._id}`}>
                    <Image
                        src={c.product.images[0].image}
                        alt=""
                        fill
                    />
                </Link>
            </div>
            
            <div className={styles.product}>
                <p className={styles.prodcutTitle}>
                    <Link href={`/shop/${c.product._id}`}>
                        {c.product.name}
                    </Link>
                </p>
                <div className={styles.prodcutSpecs}>
                    <p 
                        className={styles.prodcutSpec}
                        style={{
                            backgroundColor:c.spec.color.value||"black"
                        }}    
                    >
                        <IoMdColorPalette className={styles.icon} 
                            size={20}
                            color={c.spec.color.value || "green"}
                        />
                        {c.spec.color.title}
                    </p>
                    <p className={styles.prodcutSpec}>
                        <ImEnlarge2 className={styles.icon} 
                            size={20}
                            color="black"
                        />
                        {c.spec.size.title}
                    </p>
                </div>
            </div>
            <p className={styles.price}>
                {commaEmbedder(c.product.prices[0])}
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
                {commaEmbedder(c.product.prices[0] * currentQuantity)}
            </p>
        </div>
    )
};

export default CartItem;