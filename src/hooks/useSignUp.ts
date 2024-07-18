import { stateType } from "@/context/authContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect, useRouter } from "next/navigation";
import { render } from "react-dom";
import { toast } from "react-toastify";

export const useSignUp = async(
    credentials:any,
    useAuth:stateType,
    router:AppRouterInstance,
    cbRoute?:string
) => {
    
    // fetch
    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL+"auth/signup",{
        method:"POST",
        body:JSON.stringify(
            credentials
        ),
        }
    );    
    
    const body : {message:string,user:any} = await res.json();

    // toast the result

    const toastRes = new Promise(async(resolve,reject) => {
            if (res.ok) {
                resolve("خوش امدید");
            }

        
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

    if (res.ok) {
        // change auth status
    
        useAuth.setAuth({
            user:body?.user ?? null,
            status:true
        });
    
        // redirect
    
        router.push(cbRoute || "/");
    }


}