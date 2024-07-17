"use client"

import Filter from "@/components/filter/Filter"
import styles from "../shopPage.module.css"
import SortSelect from "@/components/sortSelect/SortSelect"
import { ProductType } from "@/utils/db/product/model"
import ProductCard from "@/components/product-card/ProductCard"
import { useState } from "react"
import { useFilterProducts } from "@/hooks/useFilterProducts"
import { LoadingOverlay } from "@/components/loading/LoadingOverlay"
import { Pagination } from "@/components/pagination/Pagination"


export const ShopPageClient = (
    {
        products:serverSideProducts,
        count,
        pageCount:serverPageCount
    }:{
        products:ProductType[]
        count:number,
        pageCount:number,
    }
) => {    
    
    const [products,setProducts]=useState<ProductType[]>(
        serverSideProducts
    );
    
    const [pageCount,setPageCount]= useState(serverPageCount);

    const {isLoading,fetcher} = useFilterProducts(setProducts,setPageCount);    

    
    return (
        <div className={styles.container}>
            <Filter productsFetcher={fetcher} count={products.length}/>
            <div className={styles.main}>
                <SortSelect/>
                <div className={styles.products}>
                    {
                        isLoading && (
                            <LoadingOverlay/>
                        )
                    }
                    {
                        products?.map((shoe:ProductType) => {
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
                <Pagination count={products.length} pageCount={pageCount} />
            </div>
        </div>
    )
}