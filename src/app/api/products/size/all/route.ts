import { SizeModel } from "@/utils/db/size/model";
import { connectToDB } from "@/utils/db/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest)=>{
    try {
        await connectToDB();

        const sizes = await SizeModel.find({});

        return NextResponse.json({
            message:"success",
            sizes
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
