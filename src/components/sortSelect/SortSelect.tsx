"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./sortSelect.module.css"
import { ChangeEvent } from "react";

const  SortSelect = () => {
    const {replace} = useRouter();
    const searchParams = useSearchParams();
    const path = usePathname();
    
    const params = new URLSearchParams(searchParams);

    const param = params.get("sort");

    function handleChange (e:ChangeEvent & any) {
        const sort = e.target.value;
        if (param === sort) {
            params.delete("sort")
        }else {
            params.set("sort",sort);
        }
        replace(`${path}?${params}`);
    };
    return (
        <div className={styles.container}>
            <p className={styles.title}>
                مرتب سازی بر اساس   
            </p>
            <select className={styles.select} 
                name="sort" id="sort"
                onChange={handleChange}
            >
                <option className={styles.option} value="name">نام</option>
                <option className={styles.option} value="low">ارزان ترین</option>
                <option className={styles.option} value="hight">گران ترین</option>
                <option className={styles.option} value="newest">جدید ترین</option>
            </select>   
        </div>
    )
};

export default SortSelect;