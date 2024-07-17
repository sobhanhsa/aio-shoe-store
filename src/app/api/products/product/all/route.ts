import { ProductModel } from "@/utils/db/product/model";
import { connectToDB } from "@/utils/db/utils";
import { NextRequest, NextResponse } from "next/server";

const POPULATED_FIELDS = [
    "sizes",
    "colors",
    "category"
]

const postsPerPage = Number(process.env.productsPerPage || 1);

const getSortQuery = (sort:string)=>{
    switch (sort) {
        case "newest" :
            return {
                createdAt:-1
            }
        case "low":
            return {
                prices:1
            }
        case "hight":
            return {
                prices:-1
            }
        case "name":
            return {
                name:1
            }
        default:
            return null
    }
}

export const GET = async(
    req:NextRequest,
)=>{
    try {

        const query : {} = JSON.parse(
            req.nextUrl.searchParams.get("filter")?.toString() ?? "{}"
        );

        const shouldPopulate = req.nextUrl.searchParams
        .get("populate") && true;

        const page = Number(
            req.nextUrl.searchParams.get("page") || 1
        ); 
        
        const sort = req.nextUrl.searchParams.get("sort"); 
        
        let sortQuery = getSortQuery(sort || "newest");

        const productsPerPage = Number(
            req.nextUrl.searchParams.get("perPage")
            ||
            process.env.productsPerPage
        ); 

        await connectToDB();
        

        // temp raw async query 
        
        const temp = ProductModel
            .find(query)
            .sort((sortQuery || {}) as any)
            .limit(productsPerPage)
            .skip(productsPerPage * (page-1));


        if (shouldPopulate) {
            temp.populate(POPULATED_FIELDS);
        }

        const products = await temp.exec()

        const docCount = await ProductModel.find(query).countDocuments();


        const pageCount = Math.ceil(
            docCount/postsPerPage
        );

        return NextResponse.json({
            message:"success",
            pageCount,
            count:products.length,
            products,
        },{
            status:200
        });

    } catch (error:any) {
        return NextResponse.json({
            message:`some thing went wrong (${error.message})`
        },{
            status:500
        })
    }
}

export const DELETE = async(req:NextRequest)=>{
    try {

        const deletedProducts = await ProductModel.deleteMany({});

        if (deletedProducts.deletedCount === 0 ){
            throw new Error("EC don't exist");
        }

        return new NextResponse(null,{ 
            status:204
        });

    } catch (error:any) {
        return NextResponse.json({
            message:`something went wrong (${error.message})`
        },{ 
            status:500
        })
    }
}
