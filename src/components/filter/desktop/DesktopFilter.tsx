"use client"

import { useFilterPropsStore } from "@/stores/filterPropsStore";
import styles from "./desktopFilter.module.css"
import { useGetFilterProps } from "@/hooks/useGetFilterProps";
import { useEffect, useRef, useState } from "react";
import { LoadingOverlay } from "@/components/loading/LoadingOverlay";
import SizeFilterSelect from "@/components/filterSelect/size/SizeFilterSelect";
import ColorFilterSelect from "@/components/filterSelect/color/ColorFilterSelect";
import { PriceFilterSelect } from "@/components/filterSelect/price/PriceFilterSelect";
import { useFilterStore } from "@/stores/filterStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOnFilterChange } from "@/hooks/useOnFilterChange";
import CategoryFilterSelect from "@/components/filterSelect/category/CategoryFilterSelect";

export const  DescktopFilter = ({
    productsFetcher,
    count
}:{
    productsFetcher:Function,
    count:number
}) => {

    const {
        isLoading,
        onApply,
        filterPropsStore
    } = useOnFilterChange({productsFetcher});

    return (
        <>
            <div 
                className={styles.container}
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
                </div>
                <hr className={styles.line} />
                {
                    Object.entries(filterPropsStore.props).map(([key,items])=>{

                        
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
                                max={filterPropsStore.props.prices.max}
                            />
                        )

                        if (key==="categories") return (
                            <CategoryFilterSelect
                                key={key}
                                title="دسته بندی ها"
                                items={items as any[]}
                            />
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
