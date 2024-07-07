import { CategoryModel } from "@/utils/db/category/model";
import { connectToDB } from "@/utils/db/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(
    req:NextRequest,
)=>{
    try {
        /*if was null assign it to false 
        & if it wasn't falsy assign it to true*/
        const shouldPopulate = (req.nextUrl.searchParams.get("populate") 
        ?? false) && true;

        await connectToDB();

        let categories = [];
        
        if (shouldPopulate) {
            categories = await CategoryModel.find({}).populate("parent");
        }else{
            categories = await CategoryModel.find({});
        }


        return NextResponse.json({
            message:"success",
            categories
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

        const deletedCategories = await CategoryModel.deleteMany({});

        console.log(
            "/api/category all DELETE() deletedCategories : "
            ,deletedCategories
        );
        

        if (deletedCategories.deletedCount === 0 ){
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
