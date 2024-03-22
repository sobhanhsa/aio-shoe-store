import { findShoes } from "@/utils/db/shoe/data";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req:NextRequest) => {
    try {
        const shoes = await findShoes();
    
        return new NextResponse(
            JSON.stringify(
                {
                    shoes:shoes, 
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