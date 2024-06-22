"use client"

import { AuthContext } from "@/context/authContext";
import { UserType } from "@/utils/db/user/model";
import { ReactNode, useState } from "react";

const ClientAuthProvider  = (
        {children,status,user}
        :
        {children:ReactNode,status:boolean,user:UserType|null}
    ) => {
    

    if (typeof window !== "undefined") {
        console.log("providers ClientAuthProvider user : ",user);
        
    }

    const [auth,setAuth] = useState<{status:any,user:any}>({
        status,
        user
    });

    return (
        <AuthContext.Provider value={{...auth,setAuth}}>
            {children}
        </AuthContext.Provider>        
    )
};

export default ClientAuthProvider;