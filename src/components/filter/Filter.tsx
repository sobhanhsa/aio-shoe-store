"use client"

import { useFilterPropsStore } from "@/stores/filterPropsStore";
import styles from "./filter.module.css"
import { useGetFilterProps } from "@/hooks/useGetFilterProps";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import FilterSelect from "../filterSelect/size/SizeFilterSelect";
import { SizeType } from "@/utils/db/size/model";
import SizeFilterSelect from "../filterSelect/size/SizeFilterSelect";
import ColorFilterSelect from "../filterSelect/color/ColorFilterSelect";
import { PriceFilterSelect } from "../filterSelect/price/PriceFilterSelect";
import { useFilterStore } from "@/stores/filterStore";

const  Filter = ({
    productsFetcher
}:{
    productsFetcher:(url?:string,filter?:string)=>void
}) => {

    const [isLoading,setIsLoading] = useState(true);

    
    // filter props store !== filter store
    
    const store = useFilterPropsStore();
    
    useEffect(() => {
        useGetFilterProps(store,setIsLoading);
    },[]);
    
    const filterStore = useFilterStore();

    console.log("filter : ",filterStore.filter);
    

    const onApply = () => {

        //clone filter object (with changing refrence)
        const filter = structuredClone(filterStore.filter);

        // a ution type consist of keys type
        type keys = keyof typeof filter;

        // delete properites that theire $in prop is empty
        Object.entries(filter).forEach(([prop,value],i)=>{
            if ((value as any)?.$in?.length === 0 || value===undefined) {
                console.log("passed key : ",prop);
                delete filter[prop as keys]
            }
        })

        console.log("final filter",filter);
        

        const stringifiedFilter : string = JSON.stringify(filter);
    

        productsFetcher(undefined,stringifiedFilter);

    }

    return (
        <div className={styles.container}>

            {
                isLoading && (
                    <LoadingOverlay/>
                )
            }

            <p className={styles.quantity}>
                نشان دادن n ایتم
            </p>
            <hr className={styles.line} />
            {
                Object.entries(store.props).map((e)=>{

                    const property = e[0];

                    const items = e[1];
                    
                    if (property === "colors") return (
                        <ColorFilterSelect 
                            title="رنگ ها" 
                            items={items as any[]}
                        />
                    )

                    if (property === "sizes") return (
                        <SizeFilterSelect 
                            title={`سایز ها`} 
                            items={items as any[]}
                        />
                    )

                    if (property === "prices") return (
                        <PriceFilterSelect
                            title="بازه قیمت"
                            min={0}
                            max={store.props.prices.max}
                        />
                    )


                    return (
                        <>
                        </>
                    )


                })
            }
            <br/>
            <button className={styles.button} onClick={onApply}
            >
                اعمال فیلتر
            </button>
        </div>
    )
};

export default Filter;