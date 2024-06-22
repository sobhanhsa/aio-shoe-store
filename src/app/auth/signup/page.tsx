"use client"

import { FormEvent, ReactNode, useState } from "react"
import styles from "./signupPage.module.css"
import { useSignIn } from "@/hooks/signIn"
import { useSignUp } from "@/hooks/signUp"

export const SignUpPage = () => {

    type keysType = "email" | "password" | "username" | "name";

    const [formInfo,setFormInfo] = useState({
        email:"",
        password:"",
        username:"",
        name:""
    });

    const onSubmit = (e?:FormEvent) => {

        e?.preventDefault();

        console.log("auth SignInPage credentials : ",formInfo);
        
        

        useSignUp(formInfo);

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
                    به کفش خونه خوش اومدی
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
                    type="text"
                    name="username" 
                    required
                    placeholder="نام کاربری"
                />
                <input className={styles.input} 
                    onChange={onInputChange}
                    type="text"
                    name="name" 
                    required
                    placeholder="نام"
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

export default SignUpPage

