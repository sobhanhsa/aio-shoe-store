"use client"

import Filter from "@/components/filter/Filter"
import styles from "../shopPage.module.css"
import SortSelect from "@/components/sortSelect/SortSelect"
import { ProductType } from "@/utils/db/product/model"
import ProductCard from "@/components/product-card/ProductCard"
import { useState } from "react"
import { useFilterProducts } from "@/hooks/useFilterProducts"


export const ShopPageClient = (
    {products:serverSideProducts}:{products:ProductType[]}
) => {    
    
    const [products,setProducts]=useState<ProductType[]>(
        serverSideProducts
    );
    
    
    return (
        <div className={styles.container}>
            <div className={styles.filterWrapper}>
                <Filter />
            </div>
            <div className={styles.main}>
                <SortSelect/>
                <div className={styles.products}>
                    {
                        products.map((shoe:ProductType) => {
                        return (
                            <ProductCard
                            key={shoe._id}
                            id={shoe._id}
                            name={shoe.name}
                            brand={shoe.brand}
                            colors={shoe.colors as any}
                            image={shoe.images[0].image}
                            sizes={shoe.sizes as any}
                            prices={shoe.prices}
                            tumbDesc={"temp"
                            }
                            />
                        )
                        })
                    }
                </div>
            </div>
            <div className={styles.paginationContainer}>

            </div>
        </div>
    )
}