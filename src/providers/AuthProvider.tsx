"use client"

import { FC, ReactNode } from "react";

const AuthProvider  = ({children,auth}:{children:ReactNode,auth:any}) => {
    

    return (
        <div>
            {children}
        </div>
    )
};

export default AuthProvider;