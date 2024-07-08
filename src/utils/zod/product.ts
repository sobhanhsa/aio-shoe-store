import { z } from "zod";

export const zProductDto = z.object({
    
    category:z.string().nonempty(),
    
    brand:z.string().nonempty(),
    
    name:z.string().nonempty(),
    
    images:z.object({
        image:z.string().nonempty(),
        colorId:z.string().nonempty()
    }).array().nonempty(),
    
    colors:z.string().array().nonempty(),
    
    sizes:z.string().array().nonempty(),
    
    prices:z.number().array().nonempty(),
    
    propertiesPrice:z.object({
        colorId:z.string().nonempty(),
        sizeId:z.string().nonempty(),
        price:z.number()
    }).array(),
    
    description:z.object({
        shortDesc:z.string().nonempty(),
        longDesc:z.string().nonempty(),
    }),

    material:z.string().nonempty(),
    
    dimensions:z.object({
        x:z.number(),
        y:z.number(),
        z:z.number(),
    })

}).strict();