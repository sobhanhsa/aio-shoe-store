import { findShoes, findShoesByFilter } from "@/utils/db/product/data";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req:NextRequest) => {
    try {

        const rawStringFilter : string | null = 
            req.nextUrl.searchParams.get("filter");

        const rawFilter = rawStringFilter 
            ? JSON.parse(rawStringFilter)
            : null;

        let shoes = [];

        if(!rawFilter) {
            shoes = await findShoes();
        }else{
            shoes = await findShoesByFilter({
                // sizes:{$in:[...]}
            });
        }
    
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