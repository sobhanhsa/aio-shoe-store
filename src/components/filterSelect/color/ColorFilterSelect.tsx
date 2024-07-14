"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import styles from "./colorFilterSelect.module.css"
import { FilterStore, useFilterStore } from "@/stores/filterStore";
import { ColorType } from "@/utils/db/color/model";

type ItemType ={title:string,value:string,_id:string}


const  ColorFilterSelect = ({
    title,
    items
}:{
    title:string,
    items:ItemType[]
}) => {
    const store = useFilterStore();

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                {title}
            </p>
            <div className={styles.colors}>
            {
                items.map(item => (
                    <Item item={item} store={store} />
                ))
            }   
            </div>
        </div>
    )
};


const Item = ({item , store}:{item:ItemType,store:FilterStore}) => {
    
    const IsSelected = store.filter.colors?.$in.includes(item._id);

    const onClick = () => {

        const set = store.filter.colors?.$in || [];
        
        // if was in set delete it

        if (set.includes(item._id)) {

            set.splice(set.indexOf(item._id),1);

            store.setNewFilter({
                colors:{
                    $in:set
                }
            });
        
            return

        };
        
        // esle add in the set

        set.push(item._id);

        store.setNewFilter({
            colors:{
                $in:set
            }
        });


    }

    return (
        <div className={styles.item} 
            key={item._id} 
            onClick={onClick}
        >
            <div className={
                    `   
                        ${styles.square}
                        ${IsSelected && styles.active}
                    `
                } 
                        
                style={{
                    backgroundColor:item.value,
                }}
            />
    </div>
    )
}


export default ColorFilterSelect;