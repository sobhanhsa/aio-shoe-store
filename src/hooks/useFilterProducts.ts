"use client"

import { ProductType } from "@/utils/db/product/model";
import { useState } from "react"




export const useFilterProducts = (
    setProducts:Function,setPageCount:Function
) => {

    const [isLoading,setIsLoading] = useState<Boolean>(false);

    const fetcher = async(
        url=process.env.NEXT_PUBLIC_API_URL+"products/product/all",
        filter?:string,
        rawQueries?:object
    )=>{

        try {
            
            setIsLoading(true);
            
            const finalUrl = new URL(url);    

            // finalUrl.searchParams.append("page",(page ?? 1).toString());
            
            Object.entries(rawQueries || {})?.forEach(([key,prop],i)=>{
                finalUrl.searchParams.append(key,(prop).toString());
            });

            if (filter) {
                finalUrl.searchParams.append(
                    "filter",filter||"{}"
                );
            }

            const res = await fetch(
                finalUrl.toString()
            );
        
            const {products,pageCount} = await res.json();
    
            setProducts(products || []);
            setPageCount(pageCount);

            setIsLoading(false);
            
        } catch (error:any) {

            console.error("/hooks/useGetProducts : ",error.message);
            
        }

    }

    return {
        isLoading,
        fetcher
    }

}