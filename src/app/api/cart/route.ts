import { createCartItem, findCartsByUserId } from "@/utils/db/cartItem/data";
import { UserType } from "@/utils/db/user/model";
import { connectToDB } from "@/utils/db/utils";
import { authMiddleWare } from "@/utils/middlewares/auth.middleware";
import { handler } from "@/utils/middlewares/handler";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const zCartBody = z.object({
    spec:z.object({
        colorName:z.string().nonempty(),
        size:z.number().nonnegative(),
        userId:z.string().nonempty(),
        productId:z.string().nonempty(),
    }),
    quantity:z.number().nonnegative().min(1)
}).strict();

type bodyType = z.infer<typeof zCartBody>; 

const postHandler = async(req:NextRequest) => {
    try {
        
        //req contains user

        const user : UserType = (req as any).user;

        const body : bodyType = await req.json();

        body.spec.userId = user._id;

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

export const POST = handler(authMiddleWare,postHandler);

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