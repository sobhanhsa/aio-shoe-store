import { englishRegex } from "@/regexs/englishExpression";
import { ColorModel } from "@/utils/db/color/model";
import { SizeModel } from "@/utils/db/size/model";
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

        const size = await SizeModel.findById(params.id);

        return NextResponse.json({
            message:"success",
            size
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
    value:z.number({message:"value must be number"}),
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

        const newSize = await SizeModel.updateOne({
            _id:params.id,
        },{
            ...body
        });

        if (newSize.modifiedCount === 0 ){
            throw new Error("EC doesn't match");
        }

        return NextResponse.json({
            message:"success",
            newSize
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

        

        const deletedSize = await SizeModel.deleteOne({
            _id:params.id,
        });

        if (deletedSize.deletedCount === 0 ){
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
