import { useFilterPropsStore } from "@/stores/filterPropsStore";
import { useFilterStore } from "@/stores/filterStore";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useGetFilterProps } from "./useGetFilterProps";

export const useOnFilterChange = ({
    productsFetcher
}:{
    productsFetcher:Function
}) => {

    const [isLoading,setIsLoading] = useState(true);

    const searchParams = useSearchParams();
    
    const params = new URLSearchParams(searchParams);    

    const page = Number(params.get("page") || 1);
    const sort = params.get("sort");
    
    useEffect(()=>{
        onApply();
        

    },[page,sort]);


    // filter props store !== filter store
    
    const filterPropsStore = useFilterPropsStore();
    

    useEffect(() => {
        useGetFilterProps(filterPropsStore,setIsLoading);
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
    }

    return (
        {
            isLoading,
            filterPropsStore,
            onApply
        }
    )

}
