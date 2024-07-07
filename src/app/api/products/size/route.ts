import { englishRegex } from "@/regexs/englishExpression";
import { ColorModel } from "@/utils/db/color/model";
import { SizeModel } from "@/utils/db/size/model";
import { zodParser } from "@/utils/zod/formatError";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const zBody = z.object({
    value:z.number({message:"value must be number"}),
    title:z.string({message:"title must be string"}),
    slug:z.string().regex(
        englishRegex,{message:"slug must be in english"}
    ),
}).strict();

type bodyType = z.infer<typeof zBody>;

export const POST = async(req:NextRequest)=>{
    try {

        const body : bodyType = await req.json();
    
        zodParser(zBody.parse,body);

        const size = new SizeModel({
            ...body
        });

        await size.save();

        return NextResponse.json({
            message:"success",
            size
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