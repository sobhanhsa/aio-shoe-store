import { englishRegex } from "@/regexs/englishExpression";
import { CategoryModel } from "@/utils/db/category/model";
import { connectToDB } from "@/utils/db/utils";
import { zCategoryDto } from "@/utils/zod/category";
import { zodParser } from "@/utils/zod/formatError";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async(req:NextRequest,
    {params}:{
        params:{
            id:string
        }
    }
)=>{
    try {

        const shouldPopulate = req.nextUrl.searchParams
            .get("populate") && true;

        await connectToDB();

        const category = await CategoryModel.findById(params.id);

        if (shouldPopulate) {
            await category.populate("parent");
        }

        return NextResponse.json({
            message:"success",
            category
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

const zBody = zCategoryDto.optional();

type bodyType = z.infer<typeof zBody>;

export const PATCH = async(req:NextRequest,{params}:{
    params:{
        id:string
    }
})=>{
    try {

        const body : bodyType = await req.json();
    
        zodParser(zBody.parse,body);

        const newCategory = await CategoryModel.updateOne({
            _id:params.id,
        },{
            ...body
        });

        if (newCategory.modifiedCount === 0 ){
            throw new Error("EC doesn't match");
        }

        return NextResponse.json({
            message:"success",
            newCategory
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

        

        const deletedCategory = await CategoryModel.deleteOne({
            _id:params.id,
        });

        if (deletedCategory.deletedCount === 0 ){
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
