"use client"

import { FormEvent, ReactNode, useState } from "react"
import styles from "./signinPage.module.css"
import { useSignIn } from "@/hooks/signIn"

export const SignInPage = () => {

    type keysType = "email" | "password"

    const [formInfo,setFormInfo] = useState({
        email:"",
        password:"",
    });

    const onSubmit = (e?:FormEvent) => {

        e?.preventDefault();

        console.log("auth SignInPage credentials : ",formInfo);
        
        

        useSignIn(formInfo);

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

