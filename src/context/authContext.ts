"use client"

import { Context, ReactNode, createContext, useContext, useState } from "react";

export type stateType = {
    user:any,
    status:any
    setAuth:(newAuth:any)=>void
}

export const AuthContext = createContext<stateType>({
    user:null,
    status:null,
    setAuth:()=>{
        
    }
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

