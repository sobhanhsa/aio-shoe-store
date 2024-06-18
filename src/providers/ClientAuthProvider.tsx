"use client"

import { UserType } from "@/utils/db/user/model";
import { ReactNode } from "react";

const ClientAuthProvider  = (
        {children,status,user}
        :
        {children:ReactNode,status:boolean,user:UserType|null}
    ) => {
    

    if (typeof window !== "undefined") {
        console.log("providers ClientAuthProvider user : ",user);
        
    }

    return (
        <>
            {children}
        </>
    )
};

export default ClientAuthProvider;