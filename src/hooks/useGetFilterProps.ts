"use client"

import { FilterProps, FilterPropsStore } from "@/stores/filterPropsStore"
import { ColorType } from "@/utils/db/color/model";

export const useGetFilterProps = (
    store:FilterPropsStore,
    loadingTrigger:Function
) => {
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    //fetch

    const propsNames = [
        "colors",
        "categories",
        "sizes"
    ]

    type keysType = "colors" | "categories" | "sizes"


    loadingTrigger(true);

    propsNames.forEach(async(v ,i)=>{

        let vForUrl = v.slice(0,-1)/*delete 's'*/;

        if (v==="categories"){
            vForUrl= "category"
        }

        const res = await fetch(
            apiUrl+
            "/products/"+vForUrl+
            "/all"
        );

        console.log("hooks res : ",res);
        

        const body = await res.json();

        const state : Partial<FilterProps> = {

        }

        state[v as keysType]=body[v] || [];

        store.setNewProps({
            ...state
        })

        if (i+1===propsNames.length) {
            loadingTrigger(false);
        }

    })


}