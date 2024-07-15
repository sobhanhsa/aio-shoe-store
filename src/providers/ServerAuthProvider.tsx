import ClientAuthProvider from "./ClientAuthProvider"
import { ReactNode } from "react";
import { cookies } from 'next/headers'
import { GetUserById } from "@/utils/db/user/data";
import jwt from "jsonwebtoken";

export const ServerAuthProvider = async({children}:{children:ReactNode}) => {

    //get auth status by cookie
    const accessToken = cookies().get("access_token");

    if (!accessToken) return (
        <>
            <ClientAuthProvider status={false} user={null}>
                {children}
            </ClientAuthProvider>
        </>
    )

    const {id} = jwt
    .verify(
        accessToken?.value,
        process.env.SECRET as string
    ) as {id:string}

    if (!id) return (
        <>
            <ClientAuthProvider status={false} user={null}>
                {children}
            </ClientAuthProvider>
        </>
    )

    //get user
    const user = await GetUserById(id);

    //send it to client provider

    //note : user || null means if user was a falsy return null

    return (
        <>
            <ClientAuthProvider status user={
                    //for react warning
                    user 
                        ? JSON.parse(JSON.stringify(user.toObject()))
                        : null
                }
            >
                {children}
            </ClientAuthProvider>
        </>
    )
}