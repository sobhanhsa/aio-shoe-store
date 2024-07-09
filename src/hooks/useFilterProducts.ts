"use client"

import { ProductType } from "@/utils/db/product/model";
import { useState } from "react"




export const useFilterProducts = (setProducts:Function) => {
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    
    const fetcher = async(
        url=process.env.NEXT_PUBLIC_API_URL+"products/product/all",
        q?:string
    )=>{

        try {
            
            setIsLoading(true);
            
            const res = await fetch(
                url
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