import { createCartItem, findCartsByUserId } from "@/utils/db/cartItem/data";
import { CartItemModel } from "@/utils/db/cartItem/model";
import { slugMaker } from "@/utils/db/cartItem/utils";
import { UserType } from "@/utils/db/user/model";
import { connectToDB } from "@/utils/db/utils";
import { authMiddleWare } from "@/utils/middlewares/auth.middleware";
import { handler } from "@/utils/middlewares/handler";
import { zodParser } from "@/utils/zod/formatError";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const POPULATED_FIELDS = [
    "spec.color",
    "spec.size",
    "product"
]

const zCartBody = z.object({
    product:z.string().nonempty(),
    spec:z.object({
        color:z.string().nonempty(),
        size:z.string().nonempty(),
    }),
    quantity:z.number().nonnegative().min(1)
}).strict();

type bodyType = z.infer<typeof zCartBody>; 

const postHandler = async(req:NextRequest) => {
    try {
        
        //req contains user




        const user : UserType = (req as any).user;

        const body : bodyType = await req.json();

        zodParser(zCartBody.parse,body);


        console.log("body : ",body);
        

        const slug = slugMaker({
            userId : user._id,
            productId : body.product,
            colorId : body.spec.color,
            sizeId: body.spec.size
        });

        const newCartItem = await CartItemModel.create({
            ...body,
            userId:user._id,
            slug
        });


        await newCartItem.populate(POPULATED_FIELDS);

        return NextResponse.json(
            {
                message:"success",
                cartItem:newCartItem
            },{
                status:201,
            }
            
        )
    } catch (err:{message:string}&any) {
        console.log("cart POST "+err.message);
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

export const getHandler = async(req:NextRequest) => {
    try {
        await connectToDB();
        

        const user : UserType = (req as any).user;

        const userId = user._id;
        
        const carts = await CartItemModel.find({
            userId
        }).populate(POPULATED_FIELDS);
        
        return NextResponse.json(
            {
                message:"success",
                cartItems:carts
            },{
                status:200,
            }
            
        )
    } catch (err:{message:string}&any) {
        console.log("cart GET",err.message);
        return NextResponse.json(
            {
                message:err.message
            },{
                status:500,
            }
        )
        
    }
}

export const GET = handler(authMiddleWare,getHandler);