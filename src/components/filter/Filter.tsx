"use client"

import { useFilterPropsStore } from "@/stores/filterPropsStore";
import styles from "./filter.module.css"
import { useGetFilterProps } from "@/hooks/useGetFilterProps";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "../loading/LoadingOverlay";
import SizeFilterSelect from "../filterSelect/size/SizeFilterSelect";
import ColorFilterSelect from "../filterSelect/color/ColorFilterSelect";
import { PriceFilterSelect } from "../filterSelect/price/PriceFilterSelect";
import { useFilterStore } from "@/stores/filterStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { FaFilter } from "react-icons/fa";

const  Filter = ({
    productsFetcher,
    count
}:{
    productsFetcher:Function,
    count:number
}) => {

    const [isOpen,setIsOpen] = useState(false);

    const [isLoading,setIsLoading] = useState(true);

    const searchParams = useSearchParams();
    
    const params = new URLSearchParams(searchParams);    

    const page = Number(params.get("page") || 1);
    const sort = params.get("sort");

    useEffect(()=>{
        onApply();
    },[page,sort]);
    

    // filter props store !== filter store
    
    const store = useFilterPropsStore();
    
    const closeFilter = () => {
        if (window.screen.width < 440) {
            setIsOpen(false)
        } 
    }

    useEffect(() => {
        useGetFilterProps(store,setIsLoading);

        if (window.screen.width > 440) {
            setIsOpen(true)
        } 
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

        const stringifiedFilter : string = JSON.stringify(filter);
    

        productsFetcher(undefined,stringifiedFilter,{
            page,
            sort
        });

        closeFilter()

    }



    return (
        <>
            <button 
                className={styles.mobileFilterButton}
                onClick={() => {
                    console.log("triggered!");
                    
                    setIsOpen(true)
                }}
            >
                <FaFilter size={30} color="white" />
            </button>

            <div 
                className={styles.container}
                style={{
                    display:(
                        isOpen ? "flex" : "none"
                    )
                }}
            >

                {
                    isLoading && (
                        <LoadingOverlay/>
                    )
                }
                <div className={styles.top}>
                    <p className={styles.quantity}>
                        نشان دادن {count} محصول
                    </p>
                    <button 
                        className={styles.mobileCloseButton}
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    >
                        <LiaWindowCloseSolid size={30}/>
                    </button>
                </div>
                <hr className={styles.line} />
                {
                    Object.entries(store.props).map((e)=>{

                        const key = e[0];

                        const items = e[1];
                        
                        if (key === "colors") return (
                            <ColorFilterSelect 
                                title="رنگ ها" 
                                items={items as any[]}
                            />
                        )

                        if (key === "sizes") return (
                            <SizeFilterSelect 
                                title={`سایز ها`} 
                                items={items as any[]}
                            />
                        )

                        if (key === "prices") return (
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
        </>
        
    )
};

export default Filter;