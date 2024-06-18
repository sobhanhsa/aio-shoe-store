import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { formatZodError, zodParser } from "@/utils/zod/formatError";
import bcrypt from "bcrypt";
import { UserModel } from "@/utils/db/user/model";
import { connectToDB } from "@/utils/db/utils";

const usernameRegEx = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/

const zBody = z.object({
    username: z.string().regex(usernameRegEx,{message:"invalid username"}),
    email: z.string().email({message:"invalid email"}),
    password: z.string().min(8,{message:"must be 5 or more characters long"}),
    name:z.string().min(3,{message:"must be 3 or more characters long"})
}).strict();


type bodyType = z.infer<typeof zBody>;

export const POST = async(req:NextRequest) => {
    try {
        const token = cookies().get("access_token");

        console.log("signup POST token : ",token);

        if (token?.value) {
            throw new Error("you are already logged in")
        }

        const body : bodyType = await req.json();

        zodParser(zBody.parse,body);

        const hash = await bcrypt.hash(body.password,Number(process.env.SALTROUNDS));

        await connectToDB();

        const user = await UserModel.create({...body,hash});

        const finalToken = jwt
            .sign({ id: user._id}, process.env.SECRET as string);

        
        let expireDate = new Date(Date.now() + 15*24*60*60*1000);

        cookies().set("access_token", finalToken , {
            expires: expireDate,
            secure: false,
            httpOnly: true,
            sameSite: 'lax',
        });

        return NextResponse.json({message:"success",user});

        
    } catch (error:any) {
        let statusCode = 500;

        return NextResponse.json({
            message:error.message
        },{
            status:statusCode
        });
    }
}