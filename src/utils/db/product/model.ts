import mongoose, { InferSchemaType, Schema } from "mongoose";
import { ColorType } from "../color/model";
import { CategoryType } from "../category/model";
import { SizeType } from "../size/model";


const productSchema = new Schema({
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    images:{
        required:true,
        type:[{
            image:{
                type:String,
                required:true
            },
            colorId:{
                type:String,
                required:true
            }
        }],
    },
    colors:{
        required:true,
        type:[
            {
                type:Schema.Types.ObjectId,
                ref:"Color"
            }
        ],
    },
    sizes:{
        required:true,
        type:[
            {
                type:Schema.Types.ObjectId,
                ref:"Size"
            }
        ]
    },
    prices:{
        required:true,
        type:[
            Number
        ]
    },
    propertiesPrice:{
        type:[
            {
                // properties
                colorId:{
                    type:Schema.Types.ObjectId,
                    ref:"Color"
                },
                sizeId:{
                    type:Schema.Types.ObjectId,
                    ref:"Size"
                },

                // price
                price:{
                    type:Number,
                    required:true
                }
            }
        ]
    },
    description:{
        type:{

            shortDesc:{
                type:String,
                required:true
            },
            longDesc:{
                type:String,
                required:true
            }
        },
        required:true
    },
    material:{
        required:true,
        type:String
    },
    dimensions:{
        required:true,
        type:{
            x:{
                type:Number,
                required:true
            },
            y:{
                type:Number,
                required:true
            },
            z:{
                type:Number,
                required:true
            }
        }
    }
},
{ timestamps: true }
);

// export type ShoeType = InferSchemaType<typeof productSchema> & {
// _id:string
// };
export type ProductType = InferSchemaType<typeof productSchema> & {
    _id:string,
    sizes:string[]|SizeType[],
    colors:string[]|ColorType[],
    category:string|CategoryType,
};

export type PopulatedProductType = ProductType & {
    colors:ColorType[],
    sizes:SizeType[],
    category:CategoryType,
}

// export const ShoeModel = mongoose.models.Shoe || mongoose.model("Shoe",productSchema);
export const ProductModel = mongoose.models.Product || mongoose.model("Product",productSchema);
