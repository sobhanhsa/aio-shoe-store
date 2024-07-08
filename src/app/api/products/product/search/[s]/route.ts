import { englishRegex } from "@/regexs/englishExpression";
import { ProductModel, ProductType } from "@/utils/db/product/model";
import { connectToDB } from "@/utils/db/utils";
import { zodParser } from "@/utils/zod/formatError";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async(
    req:NextRequest,
    {params}:{
        params:{
            s:string
        }
    }
)=>{
    try {
        await connectToDB();

        
        const rawIntrestedProperties : string | null = req
            .nextUrl.searchParams.get("instrests");
        
        // intrestedProperties for populations
        
        const intrestedProperties = rawIntrestedProperties?.split(",");
        
        const shouldPopulate = req.nextUrl.searchParams
            .get("populate") && intrestedProperties && true;


            
        const NonAlphaNumRexEx = /[^A-Za-z0-9]/g;

        const pureS = params.s?.replace(NonAlphaNumRexEx,"")        

        const query = {
            $or:[
                {
                    name:{
                        $regex: pureS, $options: 'i'
                    }
                },
                {
                    'description.shortDesc':{
                        $regex: pureS, $options: 'i'
                    }
                },
                {
                    'description.longDesc':{
                        $regex: pureS, $options: 'i'
                    }
                },
            ]
        };
        
        let products : [] | ProductType[] = [];

        if (shouldPopulate) {
            products = await ProductModel
                .find(query)
                .populate(intrestedProperties)
                .select("-description");
        }else{
            products = await ProductModel
                .find(query)
                .select("-description");
        }      

        products = [...products];

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
