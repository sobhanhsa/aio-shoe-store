import { ProductModel } from "@/utils/db/product/model";
import { connectToDB } from "@/utils/db/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(
    req:NextRequest,
)=>{
    try {
        const rawIntrestedProperties : string | null = req
        .nextUrl.searchParams.get("instrests");
        
        
        const intrestedProperties = rawIntrestedProperties?.split(",");
        
        /*if was null assign it to false 
        & if it wasn't falsy assign it to true*/
        
        const shouldPopulate = req.nextUrl.searchParams
        .get("populate") && intrestedProperties && true;

        await connectToDB();

        let products = [];
        
        if (shouldPopulate) {
            products = await ProductModel
                .find({})
                .populate(intrestedProperties)
                .select("-description");
        }else{
            products = await ProductModel
                .find({})
                .select("-description");
        }   

        return NextResponse.json({
            message:"success",
            products
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

        const deletedProducts = await ProductModel.deleteMany({});

        if (deletedProducts.deletedCount === 0 ){
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
