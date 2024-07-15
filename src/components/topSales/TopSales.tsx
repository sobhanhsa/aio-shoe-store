import { PopulatedProductType } from "@/utils/db/product/model";

import styles from "./topSales.module.css"
import ProductCard from "../product-card/ProductCard";

export const TopSales = (
    {products}:{
        products:PopulatedProductType[]
    }
)=>{

    return (
        <div className={styles.topSaleContainer}>

            <p className={styles.title}>پر فروش ترین ها</p>    
            
            <div className={styles.products}>
                {
                    products?.map((product) => {
                    return (
                        <ProductCard
                            key={product._id}
                            id={product._id.toString()}
                            name={product.name}
                            brand={product.brand}
                            colors={product.colors}
                            image={product.images[0].image}
                            sizes={product.sizes}
                            prices={product.prices}
                            tumbDesc={product.description.shortDesc.substring(0,55)}
                        />
                    )
                    })
                }
            </div>
        </div>
    )
}