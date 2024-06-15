"use client"

import { ReactNode } from "react"
import styles from "./signinPage.module.css"

export const SignInPage = () => {



    const onSubmit = (e?:any) => {
        // e.target.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL+"auth/login",{
            method:"POST",
            body:JSON.stringify({
                email:"sobi@gmail.com",
                password:"12345678"
            }),
        }).then(r => console.log(r)
        )
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1>
                    خوش اومدی مهندس ، حال و احوال؟
                </h1>
                <input className={styles.input} 
                    type="email"
                    name="email" 
                    required
                    placeholder="ایمیل"
                />
                <input className={styles.input}
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

