import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import { UserModel } from "../db/user/model";

export const authMiddleWare = async(req:NextRequest,next:Function) => {
    const token = cookies().get("access_token");
    if (!token?.value) {
        return NextResponse.json({
            message:"no token provided"
        },{
            status:401
        })
    }
    const decoded : {id:string} = jwt
        .verify(
            token.value,
            process.env.SECRET as string
        ) as any;
    
    if (!decoded) {
        return NextResponse.json({
            message:"invalid token"
        },{
            status:400
        }
        );
    };

    const user = await UserModel.findById(decoded.id);

    if (!user) {
        return NextResponse.json({
            message:"user does not exist"
        },{
            status:404
        }
        );
    };

    (req as any).user = user;

    next()

}