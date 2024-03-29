"use client"

import { MdOutlineAdd } from "react-icons/md";
import styles from "./details.module.css"
import { useState } from "react";

interface detailsProps {
    desc:string
    dimenstions:{
        x:number,
        y:number,
        z:number

    },
    reviews:null
}

const  Details = (props:detailsProps) => {
    const [descOpen,setdescOpen] = useState(false);
    const [dimenstionsOpen,setDimenstionsOpen] = useState(false);
    const [reviewsOpen,setReviewsOpen] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <p className={styles.title}>
                        توضیحات
                    </p>
                    <button className={styles.button}
                        onClick={() =>setdescOpen(p => !p)}
                    >
                        {
                            !descOpen 
                            ? <MdOutlineAdd size={20}/>
                            : <MdOutlineAdd 
                                style={{
                                    rotate: "45deg",
                                }}
                                size={20}/>
                        }
                    </button>
                </div>
                {descOpen && <div className={styles.hiddenDescs}>
                    {props.desc}
                </div>}
            </div>
            <div className={styles.dimenstions}>
                <div className={styles.top}>
                    <p className={styles.title}>
                        ابعاد
                    </p>
                    <button className={styles.button}
                        onClick={() =>setDimenstionsOpen(p => !p)}
                    >
                        {
                            !dimenstionsOpen 
                            ? <MdOutlineAdd size={20}/>
                            : <MdOutlineAdd 
                                style={{
                                    rotate: "45deg",
                                }}
                                size={20}/>
                        }
                    </button>
                </div>
                {dimenstionsOpen && <div className={styles.hiddenDescs}>
                    {props.dimenstions.x}
                    در
                    {props.dimenstions.y}
                    در
                    {props.dimenstions.z}
                </div>}
            </div>
            <div className={styles.reviews}>
                <div className={styles.top}>
                    <p className={styles.title}>
                        نظرات
                    </p>
                    <button className={styles.button}
                        onClick={() =>setReviewsOpen(p => !p)}
                    >
                        {
                            !reviewsOpen 
                            ? <MdOutlineAdd size={20}/>
                            : <MdOutlineAdd 
                                style={{
                                    rotate: "45deg",
                                }}
                                size={20}/>
                        }
                    </button>
                </div>
                {reviewsOpen && <div className={styles.hiddenDescs}>
                    coming soon!
                </div>}
            </div>
        </div>
    )
};

export default Details;