import Image from "next/image"
import styles from "./productCard.module.css"
import Link from "next/link";
import { commaEmbedder } from "@/utils/priceConventor/priceConventor";
import AddToCartButton from "@/components/addToCartButton/AddToCartButton";
import { ColorType } from "@/utils/db/color/model";
import { SizeType } from "@/utils/db/size/model";

type ProductCardParams = {
    brand:      string
    name:       string
    image:      string
    prices:      number[]
    colors:     ColorType[]
    sizes:      SizeType[]
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
        <div className={styles.container} key={params.id}>
            <Link href={"/shop/product/"+params.id}>
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
                            params.sizes.length !==0 && (
                                params.sizes?.map(size => (
                                        <div 
                                            key={size._id || size as any} 
                                            className={styles.size}
                                        >
                                            {size.title}
                                        </div>
                                    )
                                )
                            )
                        }
                        
                    </div>
                    <p className={styles.price}>
                        {priceRange}
                    </p>
                </div>
            </Link> 
            <AddToCartButton 
                colorId={params.colors[0]._id} 
                sizeId={params.sizes[0]._id} 
                product={params.id}
            />
        </div>
    )
};

export default ProductCard;