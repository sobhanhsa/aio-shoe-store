"use client"

import { ReactNode, createContext, useContext, useState } from "react";

export const AuthContext = createContext<null | {
    status:any,
    user:any,
    setAuth:(newAuth:any)=>void
}>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};