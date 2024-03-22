import Image from "next/image"
import Color from "../color/Color"
import styles from "./productCard.module.css"
import { redirect } from "next/navigation";
import Link from "next/link";

type ProductCardParams = {
    brand:      string
    name:   string
    image:      string
    prices:      number[]
    colors:     {color:string,price:number}[]
} & {
    id:string
};

const  ProductCard = (params:ProductCardParams) => {
    const lowestPrice = Math.min(...params.prices
        .map(p => Number(p)));
    const highestPrice = Math.max(...params.prices
        .map(p => Number(p)));
    
    console.log(typeof params.id)

    return (
        <Link href={"/"+params.id} key={params.id}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <Image 
                            className={styles.image}
                            alt=""
                            src={params.image}
                            fill
                        />
                    </div>
                    <div className={styles.colors}>
                        {
                            params.colors.map(({color}) => 
                                (
                                    <Color color={color} />
                                )
                            )
                        }
                    </div>
                    <div className={styles.textContainer}>
                        <div className={styles.brand}>
                            {params.brand}
                        </div>
                        <div className={styles.name}>
                            {params.name}
                        </div>
                        <div className={styles.price}>
                            {
                                lowestPrice === highestPrice ? lowestPrice :
                                lowestPrice+"-"+highestPrice
                            
                            }
                        </div>
                    </div>
                </div>
                <button className={styles.addButton}>
                    بزن به سبد
                </button>
            </div>
        </Link> 
    )
};

export default ProductCard;