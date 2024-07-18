"use client"

import styles from "./categoryFilterSelect.module.css"
import { FilterStore, useFilterStore } from "@/stores/filterStore";

type ItemType ={title:string,slug:string,_id:string}

const  CategoryFilterSelect = ({
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
    
    const IsSelected = store.filter.category === item._id;

    const onClick = () => {

        if (IsSelected) {
            store.setNewFilter(
                {category : undefined}
            )
            return
        }
        
        
        store.setNewFilter(
            {category : item._id}
        );

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
            {item.slug}
    </div>
    )
}

export default CategoryFilterSelect;