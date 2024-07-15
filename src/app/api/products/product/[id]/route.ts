import { englishRegex } from "@/regexs/englishExpression";
import { ProductModel } from "@/utils/db/product/model";
import { connectToDB } from "@/utils/db/utils";
import { zCategoryDto } from "@/utils/zod/category";
import { zodParser } from "@/utils/zod/formatError";
import { zProductDto } from "@/utils/zod/product";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const POPULATED_FIELDS = [
    "colors",
    "sizes",
    "category",

];

export const GET = async(req:NextRequest,
    {params}:{
        params:{
            id:string
        }
    }
)=>{
    try {

        
        /*if was null assign it to false 
            & if it wasn't falsy assign it to true*/
        

        const shouldPopulate = req.nextUrl.searchParams
            .get("populate") && true;

        await connectToDB();

        const product = await ProductModel
            .findById(params.id)

        if (!product) {
            return NextResponse.json({
                message:`doesn't exists`
            },{
                status:404
            })
        }

        if (shouldPopulate) {
            await product.populate(POPULATED_FIELDS);
        }

        return NextResponse.json({
            message:"success",
            product
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

const zBody = zProductDto.partial();

type bodyType = z.infer<typeof zBody>;

export const PATCH = async(req:NextRequest,{params}:{
    params:{
        id:string
    }
})=>{
    try {

        const body : bodyType = await req.json();
    
        zodParser(zBody.parse,body);

        const newProduct = await ProductModel.updateOne({
            _id:params.id,
        },{
            ...body
        });

        if (newProduct.modifiedCount === 0 ){
            throw new Error("EC doesn't match");
        }

        return NextResponse.json({
            message:"success",
            newProduct
        },{ 
            status:202
        })

    } catch (error:any) {
        return NextResponse.json({
            message:`something went wrong (${error.message})`
        },{ 
            status:500
        })
    }
}


export const DELETE = async(req:NextRequest,{params}:{
    params:{
        id:string
    }
})=>{
    try {

        

        const deletedProduct = await ProductModel.deleteOne({
            _id:params.id,
        });

        if (deletedProduct.deletedCount === 0 ){
            throw new Error("EC doesn't match");
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
