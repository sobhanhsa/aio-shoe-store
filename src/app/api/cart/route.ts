import { createCartItem, findCartsByUserId } from "@/utils/db/cartItem/data";
import { connectToDB } from "@/utils/db/utils";
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

export const GET = async(req:NextRequest) => {
    try {
        await connectToDB();

        const userId = "66080c8426f9e94d1651ae23"

        const carts = await findCartsByUserId(userId);

        return NextResponse.json(
            {
                message:"success",
                cartItems:carts
            },{
                status:200,
            }
            
        )
    } catch (err:{message:string}&any) {
        console.log(err.message);
        return NextResponse.json(
            {
                message:err.message
            },{
                status:500,
            }
        )
        
    }
}