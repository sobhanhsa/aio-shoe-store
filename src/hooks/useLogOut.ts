import { stateType, useAuthContext } from "@/context/authContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect, useRouter } from "next/navigation";
import { render } from "react-dom";
import { toast } from "react-toastify";

// get router instance (because you can't call a hook in a function!)
export const useLogOut = async(useAuth:stateType) => {
    
    // fetch
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"auth/logout");    

    // if res was ok change auth status

    // toast the result

    const toastRes = new Promise(async(resolve,reject) => {
            if (res.ok) {
                
                useAuth?.setAuth({
                    user:null,
                    status:null
                });

                resolve("حیف شد رفتی");
            }

            const body : {message:string} = await res.json();
        
            switch (body.message) {
                case "you are not logged in" :
                    reject("شما هنوز وارد نشده اید")
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

    // // redirect

    // router.push("/");

}