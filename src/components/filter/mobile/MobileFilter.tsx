"use client"

import { useFilterPropsStore } from "@/stores/filterPropsStore";
import styles from "./mobileFilter.module.css"
import { useGetFilterProps } from "@/hooks/useGetFilterProps";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "@/components/loading/LoadingOverlay";
import SizeFilterSelect from "@/components/filterSelect/size/SizeFilterSelect";
import ColorFilterSelect from "@/components/filterSelect/color/ColorFilterSelect";
import { PriceFilterSelect } from "@/components/filterSelect/price/PriceFilterSelect";
import { useFilterStore } from "@/stores/filterStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa";
import { LiaWindowCloseSolid } from "react-icons/lia";

const OpenFilterButton = ({
    opener
}:{
    opener:(newSate:boolean)=>void
}) => {
    return (
        <button className={styles.openButton}
            onClick={()=>opener(true)}
        >
            <FaFilter className={styles.icon} size={30} />
        </button>
    )
}

const CloseFilterButton = ({
    closer
}:{
    closer:(newSate:boolean)=>void
}) => {
    return (
        <button className={styles.closeButton}
            onClick={()=>closer(false)}
        >
            <LiaWindowCloseSolid className={styles.icon} size={30} />
        </button>
    )
}

export const  MobileFilter = ({
    productsFetcher,
    count
}:{
    productsFetcher:Function,
    count:number
}) => {


    const [isLoading,setIsLoading] = useState(true);
    const [isOpen,setIsOpen] = useState(false);

    const searchParams = useSearchParams();
    
    const params = new URLSearchParams(searchParams);    

    const page = Number(params.get("page") || 1);
    const sort = params.get("sort");

    useEffect(()=>{
        onApply();
    },[page,sort]);
    

    // filter props store !== filter store
    
    const store = useFilterPropsStore();
    

    useEffect(() => {
        useGetFilterProps(store,setIsLoading);
    },[]);
    
    const filterStore = useFilterStore();
    

    const onApply = () => {

        //clone filter object (with changing refrence)
        const filter = structuredClone(filterStore.filter);

        // a ution type consist of keys type
        type keys = keyof typeof filter;

        // delete properites that theire $in prop is empty
        Object.entries(filter).forEach(([prop,value],i)=>{
            if ((value as any)?.$in?.length === 0 || value===undefined) {
                delete filter[prop as keys]
            }
        })        

        const stringifiedFilter : string = JSON.stringify(filter);
    

        productsFetcher(undefined,stringifiedFilter,{
            page,
            sort
        });

        setIsOpen(false);
    }



    return (
        <>
            
            <div 
                className={styles.container}
            >
                {
                    !isOpen && <OpenFilterButton opener={setIsOpen} />
                }

                
                { isOpen && <div className={styles.wrapper}>
                    {
                        isLoading && (
                            <LoadingOverlay/>
                        )
                    }
                    <div className={styles.top}>
                        <p className={styles.quantity}>
                            نشان دادن {count} محصول
                        </p>
                        <CloseFilterButton closer={setIsOpen} />
                    </div>
                    <hr className={styles.line} />
                    {
                        Object.entries(store.props).map((e)=>{

                            const key = e[0];

                            const items = e[1];
                            
                            if (key === "colors") return (
                                <ColorFilterSelect
                                    key={key} 
                                    title="رنگ ها" 
                                    items={items as any[]}
                                />
                            )

                            if (key === "sizes") return (
                                <SizeFilterSelect
                                    key={key} 
                                    title={`سایز ها`} 
                                    items={items as any[]}
                                />
                            )

                            if (key === "prices") return (
                                <PriceFilterSelect
                                    key={key}
                                    title="بازه قیمت"
                                    min={0}
                                    max={store.props.prices.max}
                                />
                            )
                        })
                    }
                    <br/>
                    <button className={styles.button} onClick={onApply}
                    >
                        اعمال فیلتر
                    </button>
                </div>}
            </div>
        </>
        
    )
};
