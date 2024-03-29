import { findCartByUserName } from "@/utils/db/user/data";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req:NextRequest,params:{
    username:string
}) => {
    try {
        const cartItems = findCartByUserName(params.username);
        return new NextResponse(
            JSON.stringify(
                {
                    cartItems, 
                },{
                    status:500,
                } as any
            )
        );
    } catch (err:any&Error) {
        return new NextResponse(
            JSON.stringify(
                {
                    message:err["message"], 
                },{
                    status:500,
                } as any
            )
        );
    }
};