import { ProductType } from "@/utils/db/product/model";
import { ShopPageClient } from "./_client/ShopClient";

const fetcher = async(
    url=process.env.NEXT_PUBLIC_API_URL+"products/product/all"
) => {
    const res = await fetch(
        url
    );

    const body = await res.json();

    return body.products || []
}

const  ShopPage = async() => {

    const products : ProductType[] = await fetcher();

    console.log("server : ",products);
    


    return (
        <>
            <ShopPageClient products={products}/>
        </>
    )
};

export default ShopPage;