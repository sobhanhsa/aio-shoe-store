import { CategoryType } from '@/utils/db/category/model'
import { ColorType } from '@/utils/db/color/model'
import { SizeType } from '@/utils/db/size/model'
import { create } from 'zustand'

export type FilterProps = {
    colors:ColorType[],
    sizes:SizeType[],
    prices:{
        min:number,
        max:number
    },
    categories:CategoryType[]
}

export type FilterPropsStore = {
    props: FilterProps
    setNewProps : (nProp:object)=>void 
}


export const useFilterPropsStore = create<FilterPropsStore>()(
    (set)=>({
        props:{
            colors:[],
            sizes:[],
            prices:{
                min:0,
                max:100000000
            },
            categories:[]
        },
        setNewProps:(nProp:Partial<FilterProps>) => {
            set((prev)=>({
                props:{
                    ...prev.props,
                    ...nProp as any
                }
            })
        )
        }
    })
);