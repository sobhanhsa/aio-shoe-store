import { create } from 'zustand'

type FilterType = {
    prices?:{
        $gt?:number,
        $lt?:number,
    },
    colors?:{
        $in:string[]
    },
    sizes?:{
        $in:string[]
    },
    category?:string
}

export type FilterStore = {
    filter: FilterType
    setNewFilter: (filter: FilterType) => void
    deleteFilter: ()=>void
}

export const useFilterStore = create<FilterStore>()(
    (set)=>({
        filter:{},
        setNewFilter:(filter:FilterType) => {
            set((prevFilter)=>({
                filter:{
                    ...prevFilter.filter,
                    ...filter
                }
            }))
        },
        deleteFilter:() => {
            set({
                filter:{}
            })
        }
    })
);