import { englishRegex } from "@/regexs/englishExpression";
import { ColorModel } from "@/utils/db/color/model";
import { connectToDB } from "@/utils/db/utils";
import { zodParser } from "@/utils/zod/formatError";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const zBody = z.object({
    value:z.string({message:"value must be string"}),
    title:z.string({message:"title must be string"}),
    slug:z.string().regex(
        englishRegex,{message:"slug must be in english"}
    ),
}).strict();

type bodyType = z.infer<typeof zBody>;

export const POST = async(req:NextRequest)=>{
    try {

        await connectToDB();

        const body : bodyType = await req.json();
    
        zodParser(zBody.parse,body);

        const color = new ColorModel({
            ...body
        });

        await color.save();

        return NextResponse.json({
            message:"success",
            color
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

