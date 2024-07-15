import { ProductModel } from "@/utils/db/product/model";
import { connectToDB } from "@/utils/db/utils";
import { NextRequest, NextResponse } from "next/server";

const POPULATED_FIELDS = [
    "sizes",
    "colors",
    "category"
]

export const GET = async(
    req:NextRequest,
)=>{
    try {

        const query : {} = JSON.parse(
            req.nextUrl.searchParams.get("filter")?.toString() ?? "{}"
        );
        

        /*

        {
            prices:{
                $gt:500,
                $lt:1500,
            },

            colors:{
                $all:["...","..."]
            },

            sizes:{
                $all:["...","..."]
            }

        }

        */

        /*if was null assign it to false 
        & if it wasn't falsy assign it to true*/
        
        const shouldPopulate = req.nextUrl.searchParams
        .get("populate") && true;

        const page = Number(
            req.nextUrl.searchParams.get("page") || 1
        ); 
        
        const postsPerPage = Number(
            req.nextUrl.searchParams.get("perPage")
            ||
            process.env.postsPerPage
        ); 

        await connectToDB();
        
        // temp raw async query 
        
        const temp = ProductModel
            .find(query)
            .limit(postsPerPage)
            .skip(postsPerPage * (page-1));

        if (shouldPopulate) {
            temp.populate(POPULATED_FIELDS);
        }

        const products = await temp.exec()

        return NextResponse.json({
            message:"success",
            products
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
