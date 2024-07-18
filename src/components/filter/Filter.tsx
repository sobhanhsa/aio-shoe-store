import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { DescktopFilter } from "./desktop/DesktopFilter"
import { MobileFilter } from "./mobile/MobileFilter";
import { useFilterStore } from "@/stores/filterStore";
import { useGetFilterProps } from "@/hooks/useGetFilterProps";
import { useFilterPropsStore } from "@/stores/filterPropsStore";

const Filter = (
    {
        productsFetcher,
        count
    }:{
        productsFetcher:Function,
        count:number
    }
) => {
    return (
        <>
            <DescktopFilter productsFetcher={productsFetcher} count={count} />
            <MobileFilter productsFetcher={productsFetcher} count={count} />
        </>
    )
}

export default Filter;