import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { formatZodError } from "@/utils/zod/formatError";
import bcrypt from "bcrypt";
import { UserModel, UserType } from "@/utils/db/user/model";
import { connectToDB } from "@/utils/db/utils";


const zBody = z.object({
    email: z.string().email({message:"invalid email"}),
    password: z.string().min(8,{message:"must be 5 or more characters long"}),
}).strict();

type bodyType = z.infer<typeof zBody>;

const zodParser = (cb:Function,dto:any) => {
    try{
        cb(dto);
    } catch (error:any) {
        throw new Error(formatZodError(error));
    }
}

export const POST = async(req:NextRequest) => {
    try {
        const token = cookies().get("access_token");

        console.log("login POST token : ",token);

        if (token?.value) {
            throw new Error("you are already logged in")
        }

        const body : bodyType = await req.json();

        zodParser(zBody.parse,body);

        await connectToDB();

        const user = await UserModel.findOne({
            email:body.email
        });

        if (!user) {
            throw new Error("email does not match");
        }

        const result = await bcrypt.compare(body.password,user.hash as string);

        console.log("login POST result : ",result)

        if (!result) throw new Error("incorrect password");

        const finalToken = jwt
            .sign({ id: user._id}, process.env.SECRET as string);

        
        let expireDate = new Date(Date.now() + 15*24*60*60*1000);

        cookies().set("access_token", finalToken , {
            expires: expireDate,
            secure: false,
            httpOnly: true,
            sameSite: 'lax',
        });

        delete user["_doc"].hash

        return NextResponse.json({
            message:"success",
            user:{
                ...user["_doc"],
            }
        });

        
    } catch (error : any) {
        
        let statusCode = 500;

        if (
            (
                error.message as string
            ).includes("you are already logged in")
            ||
            (
                error.message as string
            ).includes("email does not match")
            ||
            (
                error.message as string
            ).includes("incorrect password")
        ) {
            statusCode = 400
        }

        return NextResponse.json({
            message:error.message
        },{
            status:statusCode
        })
    }
}