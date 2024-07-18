import { englishRegex } from "@/regexs/englishExpression";
import { CategoryModel } from "@/utils/db/category/model";
import { connectToDB } from "@/utils/db/utils";
import { zCategoryDto } from "@/utils/zod/category";
import { zodParser } from "@/utils/zod/formatError";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const zBody = zCategoryDto;

type bodyType = z.infer<typeof zBody>;

export const POST = async(req:NextRequest)=>{
    try {

        await connectToDB();

        const body : bodyType & {slug?:string} = await req.json();
    
        zodParser(zBody.parse,body);

        body.slug = body.title;

        if (body.parent) {
            const parentCat = await CategoryModel.findById(body.parent);
            parentCat && (
                body.slug = parentCat.slug += "-" + body.title
            )
            // slug example : shoe-men + -kid
        }

        const category = new CategoryModel({
            ...body
        });


        
        await category.save();
        
        // await category.populate("parent");
        
        return NextResponse.json({
            message:"success",
            category
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

