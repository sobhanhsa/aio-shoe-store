"use client"

import { FormEvent, ReactNode, useState } from "react"
import styles from "./signinPage.module.css"
import { useSignIn } from "@/hooks/useSignIn"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthContext } from "@/context/authContext"

export const SignInPage = ({
    searchParams
}:{
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {

    type keysType = "email" | "password"

    // define useSignUp requirments

    const router = useRouter();

    const useAuth = useAuthContext();

    const [formInfo,setFormInfo] = useState({
        email:"",
        password:"",
    });
    
    const cbRoute = useSearchParams().get("cbRoute") ?? undefined;

    console.log("signinpage SignInPage cbRoute query : ",cbRoute);
    

    const onSubmit = (e?:FormEvent) => {

        e?.preventDefault();

        

        useSignIn(formInfo,useAuth,router,cbRoute);

    }

    const onInputChange = (e:any) => {
        setFormInfo(prev  => {
            prev[e.target.name as keysType] = e.target.value;
            return {
                ...prev
            }
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1>
                    خوش اومدی مهندس ، حال و احوال؟
                </h1>
                <input className={styles.input} 
                    onChange={onInputChange}
                    type="email"
                    name="email" 
                    required
                    placeholder="ایمیل"
                />
                <input className={styles.input}
                    onChange={onInputChange}
                    type="password"
                    name="password" 
                    required
                    placeholder="رمز عبور"
                />
                <button className={styles.button} onClick={onSubmit}>
                    ورود
                </button>
            </form>
            <div className={styles.img}>

            </div>
        </div>
    )
}

export default SignInPage

