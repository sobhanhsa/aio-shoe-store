"use client"

import { ReactNode } from "react";

const ClientAuthProvider  = ({children,status}:{children:ReactNode,status:string}) => {
    

    return (
        <div>
            {children}
        </div>
    )
};

export default ClientAuthProvider;