import { stateType } from "@/context/authContext";
import { UserType } from "@/utils/db/user/model";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useSignIn = async(
    credentials:any,
    useAuth:stateType,
    router:AppRouterInstance
) => {

    // fetch
    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL+"auth/login",{
        method:"POST",
        body:JSON.stringify(
            credentials
        ),
        }
    );

    console.log("hooks useSignIn res : ",res);
    

    const body : {message:string,user:UserType} = await res.json();
    
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
                case "email does not match":
                    reject("ایمیل ثبت نشده");
                case "incorrect password":
                    reject("رمز عبور اشتباه");
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

    // change auth status

    useAuth.setAuth({
        user:body?.user ?? null,
        status:true
    });

    // redirect

    router.push("/");


}