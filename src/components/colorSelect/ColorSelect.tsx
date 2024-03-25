"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import styles from "./colorSelect.module.css"

const  ColorSelect = ({
    title,
    colors
}:{
    title:string,
    colors:string[]
}) => {
    const {replace} = useRouter();
    const searchParams = useSearchParams();
    const path = usePathname();
    
    const params = new URLSearchParams(searchParams);

    const param = params.get("color");

    function handleClick (this: string) {
        param == this ? params.delete("color")
            : params.set("color",this);
        replace(`${path}?${params}`);
    };
    return (
        <div className={styles.container}>
            <p className={styles.title}>
                {title}
            </p>
            <div className={styles.colors}>
            {
                colors.map(color => (
                    <div className={styles.color} key={color} onClick={handleClick.bind(color)}>
                        <div className={`${styles.square}
                            ${param == color ? styles.active : "" }
                        `} 
                        
                            style={{
                                backgroundColor:"#"+color,
                                border:color==="FFFFFF" ?
                                    "1px solid black" : "none"
                            }}
                        ></div>
                    </div>
                ))
            }   
            </div>
        </div>
    )
};

export default ColorSelect;