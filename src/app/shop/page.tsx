import { ProductType } from "@/utils/db/product/model";
import { ShopPageClient } from "./_client/ShopClient";

const fetcher = async(
    url=process.env.NEXT_PUBLIC_API_URL+"products/product/all"
) => {
    const finalUrl = new URL(`${url}`);

    finalUrl.searchParams.append("populate","y");

    console.log("final : ",finalUrl.toString());

    const res = await fetch(
        finalUrl.toString(),{
            cache:"no-store"
        }
    );

    const body = await res.json();

    return {
        products:body.products || [],
        count:body.count,
        pageCount:body.pageCount
    }
}

const  ShopPage = async() => {

    const {
        count,
        pageCount,
        products
    } : {
        count:number,
        pageCount:number,
        products:ProductType[]
    } = await fetcher();    
    
    return (
        <>
            <ShopPageClient
                products={products}
                count={count}
                pageCount={pageCount}
            />
        </>
    )
};

export default ShopPage;