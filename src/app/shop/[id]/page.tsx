import { findShoe } from "@/utils/db/shoe/data";
import styles from "./singleShoe.module.css"
import { ShoeType } from "@/utils/db/shoe/model";
import Image from "next/image";

const  SingleShoe = async({params}:{
    params:{
        id:string
    }
}) => {
    const shoe : ShoeType = await findShoe(params.id);
    return (
        <div className={styles.container}>
            <button className={styles.addButton}>
                افزون به سبد خرید
            </button>
            <div className={styles.imageContainer}>
                <Image className={styles.image} 
                    src={shoe.images[0].image} alt="" fill/>
            </div>
            <div className={styles.textContainer}>
                <p className={styles.brand}>
                    {shoe.brand}
                </p>
                <p className={styles.title}>
                    {shoe.name}
                </p>
                
            </div>
        </div>
    )
};

export default SingleShoe;