"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from './pagination.module.css';
import { GrNext, GrPrevious } from "react-icons/gr";

const PItem = ({
    onClick,
    num,
    isCurrent
}:{
    onClick:Function,
    num:number|"...",
    isCurrent:boolean
}) => {
    return (
        <span 
            className={`${styles.item} ${isCurrent && styles.itemCurrent}`}
            onClick={onClick as any}
        >
            {num}
        </span>
    )
}

export const Pagination= ({
    count,
    pageCount
}:{
    count:number,
    pageCount:number
})=>{

    /* 
        if this component has been rendred 
        it means that count is greatar than 1
    */
    
        
    const searchParams = useSearchParams();
    
    const {replace} = useRouter();
    
    const path = usePathname();

    const params = new URLSearchParams(searchParams);    

    const currnetPage = Number(params.get("page") || 1);

    const hasNext = !(currnetPage + 1 > pageCount);
    
    const hasPrev = !(currnetPage <= 1);

    if (currnetPage > pageCount) {

        params.set("page",(pageCount || 1).toString());

        replace(`${path}?${params}`);
    }

    if (currnetPage < 1) {

        params.set("page",(1    ).toString());

        replace(`${path}?${params}`);
    }

    const onNextClick = () => {

        if (!hasNext) {
            return
        }
        
        params.set("page",(currnetPage + 1).toString());
        
        replace(`${path}?${params}`);
    }

    const onPrevClick = () => {

        const nextPage = currnetPage <= 1 ? 1 : currnetPage - 1;

        params.set("page",nextPage.toString());
        
        replace(`${path}?${params}`);
    }

    return (
        <div className={styles.container}>
            <button 
                className={styles.button}
                onClick={onPrevClick}
                disabled={!hasPrev}
            >
                <GrPrevious className={styles.icon} size={25} />
            </button>


            {
                Array.from({length: pageCount}, (_, i) => Number(i)+1)
                .map((v,i)=>{                    

                    return (
                        <PItem 
                            key={i}
                            onClick={
                                () => {
                                    params.set("page",(v).toString());
        
                                    replace(`${path}?${params}`);
                                }
                            }

                            isCurrent={
                                currnetPage === (i +1) && true
                            } 
                            num={v}
                        />
                    )
                })
            }

            <button 
                className={styles.button}
                onClick={onNextClick}
                disabled={!hasNext}
            >
                <GrNext className={styles.icon} size={25} />
            </button>
        </div>
    )
}