import { findProductById } from "@/utils/db/product/data";
import styles from "./singleShoe.module.css"
import { ProductType } from "@/utils/db/product/model";
import { ProductImageSwiper } from "@/components/productImageSwiper/ProductImageSwiper";
import SimilarItems from "@/components/similarItems/SimilarItems";
import SingleProductClient from "./_client/Client";
import { redirect } from "next/navigation";

const fetcher = async(
    url=process.env.NEXT_PUBLIC_API_URL+"/products/product/",
    id:string
) => {  
    
    const finalUrl = new URL(`${url}${id}`);

    finalUrl.searchParams.append("populate","y");

    console.log("final : ",finalUrl);
    

    const res = await fetch(finalUrl.toString(),{
        cache:"no-store"
    });
    
    return res.json();

}

const  SingleProductPage = async({params}:{
    params:{
        id:string
    }
}) => {

    const product : ProductType = (await fetcher(undefined,params.id))?.product;        

    if (!product) {
        redirect("/404");
    }

    return (
        <SingleProductClient product={JSON.stringify(product)}/>
    )
};

export default SingleProductPage;