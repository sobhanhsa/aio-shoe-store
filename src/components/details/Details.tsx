"use client"

import { MdOutlineAdd } from "react-icons/md";
import styles from "./details.module.css"
import { useState } from "react";

interface detailsProps {
    desc:string
    dimenstions:string,
    reviews:null
}

const  Details = (props:detailsProps) => {
    const [descOpen,setdescOpen] = useState(true);
    const [dimenstionsOpen,setDimenstionsOpen] = useState(true);
    const [reviewsOpen,setReviewsOpen] = useState(true);
    return (
        <div className={styles.container}>
            <div className={styles.desc}>
                <p className={styles.title}>
                    توضیحات
                </p>
                <button className={styles.button}
                    onClick={() =>setdescOpen(p => !p)}
                    >
                    <MdOutlineAdd size={20}/>
                </button>
            </div>
            <div className={styles.dimenstions}>
                <p className={styles.title}>
                    ابعاد
                </p>
                
                <button className={styles.button}
                    onClick={() =>setDimenstionsOpen(p => !p)}
                    >
                    <MdOutlineAdd size={20}/>
                </button>
                
            </div>
            <div className={styles.reviews}>
                <p className={styles.title}>
                    دیدگاه ها
                </p>

                <button className={styles.button}
                    onClick={() =>setReviewsOpen(p => !p)}
                >
                    <MdOutlineAdd size={20}/>
                </button>
                
            </div>
        </div>
    )
};

export default Details;