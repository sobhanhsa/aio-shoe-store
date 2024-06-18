import { redirect, useRouter } from "next/navigation";
import { render } from "react-dom";
import { toast } from "react-toastify";

export const useSignUp = async(credentials:any) => {
    
    // fetch
    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL+"auth/signup",{
        method:"POST",
        body:JSON.stringify(
            credentials
        ),
        }
    );

    console.log("hooks useSignup res : ",res);
    

    // toast the result

    const toastRes = new Promise(async(resolve,reject) => {
            if (res.ok) {
                resolve("خوش امدید");
            }

            const body : {message:string} = await res.json();
        
            switch (body.message) {
                case "must be 5 or more characters long":
                    reject("رمز عبور حداقل باید پنچ حرف باشد")
                case "invalid email" :
                    reject("ایمیل اشتباه");
                case "you are already logged in" :
                    reject("شما در حال حاضر وارد شده اید");
                default :
                    reject("شرمساریم!مشکلی رخ داد");
                
            }
        }
    );

    toast.promise(toastRes,{
        pending:"در حال اعتبار سنجی",
        success:{
            render({data}){
                return `${data}`
            }
        },
        error:{
            render({data}){
                return `${data}`
            }
        },
    });

    // redirect

    useRouter().refresh();


}