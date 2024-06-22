import { redirect, useRouter } from "next/navigation";
import { render } from "react-dom";
import { toast } from "react-toastify";

export const useLogOut = async() => {
    
    // fetch
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"auth/logout");

    console.log("hooks useLogOut res : ",res);
    

    // if res was ok change auth status

    // toast the result

    const toastRes = new Promise(async(resolve,reject) => {
            if (res.ok) {
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

    // redirect

    

}