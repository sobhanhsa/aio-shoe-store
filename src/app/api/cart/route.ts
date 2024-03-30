import { createCartItem } from "@/utils/db/cartItem/data";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    try {
        const body = await req.json();


        const newCartItem = await createCartItem(body);

        return NextResponse.json(
            {
                message:"success",
                cartItem:newCartItem
            },{
                status:201,
            }
            
        )
    } catch (err:{message:string}&any) {
        console.log(err.message);
        if ((err.message).includes("E11000")) {
            return NextResponse.json(
                {
                    message:"duplicated cartItem"
                },{
                    status:400,
                }
            )
        } 
        return NextResponse.json(
            {
                message:err.message
            },{
                status:500,
            }
        )
        
    }
}