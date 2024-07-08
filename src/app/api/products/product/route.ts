import { englishRegex } from "@/regexs/englishExpression";
import { ProductModel } from "@/utils/db/product/model";
import { connectToDB } from "@/utils/db/utils";
import { zodParser } from "@/utils/zod/formatError";
import { zProductDto } from "@/utils/zod/product";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const zBody = zProductDto;

type bodyType = z.infer<typeof zBody>;

export const POST = async(req:NextRequest)=>{
    try {

        await connectToDB();

        const body : bodyType = await req.json();
    
        zodParser(zBody.parse,body);

        const product = new ProductModel({
            ...body
        });

        await product.save();
                
        return NextResponse.json({
            message:"success",
            product
        },{
            status:201
        });

    } catch (error:any) {
        return NextResponse.json({
            message:`something went wrong (${error.message})`
        },{ 
            status:500
        })
    }
}

