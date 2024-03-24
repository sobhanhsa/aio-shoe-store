import Image from "next/image"
import Color from "../color/Color"
import styles from "./productCard.module.css"
import { redirect } from "next/navigation";
import Link from "next/link";

type ProductCardParams = {
    brand:      string
    name:       string
    image:      string
    prices:      number[]
    colors:     {color:string,price:number}[]
    sizes:      {size:number,price:number}[]
    tumbDesc:string
} & {
    id:string
};

const  ProductCard = (params:ProductCardParams) => {
    const lowestPrice = Math.min(...params.prices
        .map(p => Number(p)));
    const highestPrice = Math.max(...params.prices
        .map(p => Number(p)));
    

    const priceRange = lowestPrice === highestPrice 
        ? 
            lowestPrice 
        :
            lowestPrice+"-"+highestPrice

    return (
        <Link href={"/"+params.id} key={params.id}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <Image 
                        className={styles.image}
                        alt=""
                        src={params.image}
                        fill
                    />
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.name}>
                        {params.name}
                    </div>
                    <div className={styles.brand}>
                        {params.brand}
                    </div>
                    <div className={styles.sizeContainer}>
                        {
                            params.sizes.map(size => (
                                <div key={size.size} className={styles.size}>
                                    {size.size}
                                </div>
                            ))
                        }
                        
                    </div>
                    <p className={styles.price}>
                        {priceRange}
                    </p>
                    <p className={styles.tumbDesc}>
                        {params.tumbDesc}
                    </p>
                </div>
                <button className={styles.addButton}>
                افزودن به سبد خرید 
                </button>
            </div>
        </Link> 
    )
};

export default ProductCard;