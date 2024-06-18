import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { handler } from "@/utils/middlewares/handler";
import { authMiddleWare } from "@/utils/middlewares/auth.middleware";

//check auth
const checkAuth = (token:string) => {
    const decoded : {id:string} = jwt.verify(token, process.env.SECRET as string) as any;
    if (!decoded) throw "invalid token";
    return decoded
}

const usernameRegEx = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/

const zUsername = z.string().regex(usernameRegEx,{message:"invalid username"});
const zEmail = z.string().email({message:"invalid email"})
const zPassword = z.string().min(8,{message:"must be 5 or more characters long"})
const zName = z.string().min(3,{message:"must be 3 or more characters long"})

export const GET = (req:NextRequest) => {
    try {
        const token = cookies().get("access_token");

        console.log("logout GET token : ",token);

        if (!token?.value) {
            throw new Error("you are not logged in")
        }

        cookies().delete("access_token");

        return NextResponse.json({message:"success"});

        
    } catch (error:any) {
        return NextResponse.json({
            message:error.message
        })
    }
}

