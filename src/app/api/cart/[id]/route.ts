import { deleteCartItem, updateCartQuantity } from "@/utils/db/cartItem/data";
import { connectToDB } from "@/utils/db/utils";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = (req:NextRequest,{params}:{params:{id:string}}) => {
    try {
        connectToDB();
        const {searchParams} = new URL(req.url);
        const quantity = Number(searchParams.get("quantity"));
        console.log("cart [id] PATCH",quantity);
        const cart = updateCartQuantity(params.id,quantity);
        return NextResponse.json({
            cart,
            message:"success"
        },{
            status:201
        })
    } catch (err:any&{message:string}) {
        return NextResponse.json({
            message:err.message
        },{
            status:500
        })
    }
}
export const DELETE = async(req:NextRequest,{params}:{params:{id:string}}) => {
    try {
        connectToDB();
        const cart = await deleteCartItem(params.id);
        return NextResponse.json({
            cart,
            message:"success"
        },{
            status:201
        })
    } catch (err:any&{message:string}) {
        return NextResponse.json({
            message:err.message
        },{
            status:500
        })
    }
}