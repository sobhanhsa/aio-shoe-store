import { englishRegex } from "@/regexs/englishExpression";
import { ColorModel } from "@/utils/db/color/model";
import { connectToDB } from "@/utils/db/utils";
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
        await connectToDB();

        const color = await ColorModel.findById(params.id);

        return NextResponse.json({
            message:"success",
            color
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

const zBody = z.object({
    value:z.string({message:"value must be string"}),
    title:z.string({message:"title must be string"}),
    slug:z.string().regex(
        englishRegex,{message:"slug must be in english"}
    ),
}).strict();

type bodyType = z.infer<typeof zBody>;

export const PATCH = async(req:NextRequest,{params}:{
    params:{
        id:string
    }
})=>{
    try {

        const body : bodyType = await req.json();
    
        zodParser(zBody.parse,body);

        const newColor = await ColorModel.updateOne({
            _id:params.id,
        },{
            ...body
        });

        if (newColor.modifiedCount === 0 ){
            throw new Error("EC doesn't match");
        }

        return NextResponse.json({
            message:"success",
            newColor
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

        

        const deletedColor = await ColorModel.deleteOne({
            _id:params.id,
        });

        if (deletedColor.deletedCount === 0 ){
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
