import ClientAuthProvider from "./ClientAuthProvider"
import { ReactNode } from "react";

export const ServerAuthProvider = ({children}:{children:ReactNode}) => {
    //get auth status by cookie

    //send it to client provider

    return (
        <>
            <ClientAuthProvider status="">
                {children}
            </ClientAuthProvider>
        </>
    )
}