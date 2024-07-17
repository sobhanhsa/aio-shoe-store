"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./sizeFilterSelect.module.css"
import { FilterStore, useFilterStore } from "@/stores/filterStore";

type ItemType ={title:string,value:string,_id:string}

const  SizeFilterSelect = ({
    title,
    items,
}:{
    title:string,
    items:ItemType[],
}) => {


    const store = useFilterStore();

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                {title}
            </p>
            {
                items.map(item => (
                    <Item key={item._id} item={item} store={store} />
                ))
            }
        </div>
    )
};

const Item = ({item , store}:{item:ItemType,store:FilterStore}) => {
    
    const IsSelected = store.filter.sizes?.$in?.includes(item._id);

    const onClick = () => {

        const set = store.filter.sizes?.$in || [];
        
        // if was in set delete it

        if (set?.includes(item._id)) {

            set.splice(set.indexOf(item._id),1)

            store.setNewFilter({
                sizes:{
                    $in:set
                }
            });
        
            return

        };
        
        // esle add in the set

        set.push(item._id.toString());

        store.setNewFilter({
            sizes:{
                $in:set
            }
        });


    }

    return (
        <div className={styles.item} 
            key={item._id} 
            onClick={onClick}
        >
            <div 
                className={
                    `
                        ${styles.square}  
                        
                        ${IsSelected && styles.squareActive}
                    `    
                }
            />   
            {item.title}
    </div>
    )
}

export default SizeFilterSelect;