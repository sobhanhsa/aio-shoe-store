"use client"

import { ProductType } from "@/utils/db/product/model";
import { useState } from "react"




export const useFilterProducts = (setProducts:Function) => {

    const [isLoading,setIsLoading] = useState<Boolean>(false);

    const fetcher = async(
        url=process.env.NEXT_PUBLIC_API_URL+"products/product/all",
        filter?:string
    )=>{

        try {
            
            setIsLoading(true);
            
            console.log("filter",filter);
            

            const finalUrl = new URL(url);
            
            if (filter) {
                finalUrl.searchParams.append(
                    "filter",filter||"{}"
                );
            }

            const res = await fetch(
                finalUrl.toString()
            );
        
            const body = await res.json();
    
            setProducts(body.products);
    
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