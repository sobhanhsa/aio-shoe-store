import Image from "next/image"
import styles from "./productCard.module.css"
import Link from "next/link";
import { commaEmbedder } from "@/utils/priceConventor/priceConventor";

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
            commaEmbedder(lowestPrice) 
        :
            commaEmbedder(lowestPrice)+"-"+commaEmbedder(highestPrice)

    return (
        <div className={styles.container}>
            <Link href={"/shop/"+params.id} key={params.id}>
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
                                <div 
                                    key={size.size} 
                                    className={styles.size}
                                >
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
            </Link> 
            <button className={styles.addButton}>
            افزودن به سبد خرید 
            </button>
        </div>
    )
};

export default ProductCard;