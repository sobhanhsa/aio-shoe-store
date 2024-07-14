"use client"

import 'rsuite/RangeSlider/styles/index.css';


import { InputGroup, InputNumber, RangeSlider } from "rsuite"
import styles from "./priceFilterSelect.module.css"
import { useFilterStore } from "@/stores/filterStore"

import { formatNum } from "@/utils/format/numberFormat";

export const PriceFilterSelect = ({
    title,
    min,
    max
}:{
    title:string,
    min:number,max:number
}) => {

    const store = useFilterStore();

    

    return (
        <div className={styles.container}>
            <RangeSlider 
                handleClassName={styles.slider}

                step={1000}
                defaultValue={[
                    min,
                    max
                ]}
                max={max}

                onChange={(value:[number,number])=>{

                    const newPrice = {
                        $gt:value[0],
                        $lt:value[1],
                    }
                    store.setNewFilter({
                        prices:newPrice
                    })

                }}
                renderTooltip={(value)=>{
                    return (<span className={styles.tooltip}>
                        {`${formatNum(value || 0)}`}
                    </span>)
                        
                }}
                style={
                    {
                        width:200,
                    }
                }
            
                progress
            />
            <InputGroup>
                <InputNumber
                    formatter={(value)=>formatNum(Number(value))}
                    min={0}
                    max={max}
                    value={store.filter.prices?.$gt || min}
                    onChange={nextValue => {

                        const prevPrice = store.filter.prices

                        store.setNewFilter({
                            prices:{
                                ...prevPrice,
                                $gt:Number(nextValue)
                            }
                        });

                    }}
                />
                <InputGroup.Addon>تا</InputGroup.Addon>
                <InputNumber
                    formatter={(value)=>formatNum(Number(value))}
                    min={0}
                    max={max}
                    value={store.filter.prices?.$lt || max}
                    onChange={nextValue => {
                        if (
                            Number(nextValue) < (Number(store.filter.prices?.$gt))
                        ) return

                        const prevPrice = store.filter.prices;


                        store.setNewFilter({
                            prices:{
                                ...prevPrice,
                                $lt:Number(nextValue)
                            }
                        });
                    }}
                />
            </InputGroup>
        </div>
    )
}