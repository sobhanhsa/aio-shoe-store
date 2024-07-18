import { englishRegex } from "@/regexs/englishExpression";
import { CategoryModel, CategoryType } from "@/utils/db/category/model";
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

        const shouldPopulate = req.nextUrl.searchParams.get("populate") 
            && true;

        const NonAlphaNumRexEx = /[^A-Za-z0-9]/g;

        const pureS = params.s?.replace(NonAlphaNumRexEx,"")        

        const query = {
            $or:[
                {
                    title:{
                        $regex: pureS, $options: 'i'
                    }
                },
                {
                    slug:{
                        $regex: pureS, $options: 'i'
                    }
                },
            ]
        };

        // if (shouldPopulate) {
        //     categories = await CategoryModel.find(query).populate("parent");
        // }else{
        //     categories = await CategoryModel.find(query);
        // }      

        const temp = CategoryModel.find(query);

        if (shouldPopulate) {
            temp.populate("parent");
        }

        const categories = await temp.exec();


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
