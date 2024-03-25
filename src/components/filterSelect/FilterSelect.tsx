"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./filterSelect.module.css"

const  FilterSelect = ({
    name,
    title,
    items,
}:{
    name:string,
    title:string,
    items:{title:string,value:string}[]
}) => {
    const {replace} = useRouter();
    const searchParams = useSearchParams();
    const path = usePathname();
    
    const params = new URLSearchParams(searchParams);

    const param = params.get(name);

    function handleClick (this: string) {
        if (param === this) {
            params.delete(name)
        }else {
            params.set(name,this);
        }
        replace(`${path}?${params}`);
    };
    return (
        <div className={styles.container}>
            <p className={styles.title}>
                {title}
            </p>
            {
                items.map(item => (
                    <div className={styles.item} 
                        key={item.value} 
                        onClick={handleClick.bind(item.value)}
                    >
                        <div 
                            className={
                                `${styles.square} 
                                
                                ${param === item.value ? styles.squareActive 
                                    : ""}`
                            }
                        />   
                        {item.title}
                    </div>
                ))
            }
        </div>
    )
};

export default FilterSelect;