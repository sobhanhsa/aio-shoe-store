"use client"

import { UserType } from "@/utils/db/user/model";
import { ReactNode } from "react";

const ClientAuthProvider  = (
        {children,status,user}
        :
        {children:ReactNode,status:boolean,user:UserType|null}
    ) => {
    

    if (typeof window !== "undefined") {
        console.log(user);
        
    }

    return (
        <div>
            {children}
        </div>
    )
};

export default ClientAuthProvider;