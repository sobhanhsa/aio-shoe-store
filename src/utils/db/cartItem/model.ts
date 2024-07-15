import mongoose, { InferSchemaType, Schema, SchemaType } from "mongoose";
import { ProductType } from "../product/model";
import { ColorType } from "../color/model";
import { SizeType } from "../size/model";


const cartItemSchema = new Schema({
    slug:{
        unique:true,
        requirled:true,
        type:String
    },
    userId:{
        required:true,
        type:String
    },  
    product:{
        required:true,
        type:String,
        ref:"Product"
    },  
    spec :{
        required:true,
        type:{
            _id:false,
            color:{
                type:String,
                ref:"Color",
                required:true
            },
            size:{
                type:String,
                ref:"Size",
                required:true
            },
        }
    },
    
    quantity:{
        required:true,
        type:Number
    }
},
{ timestamps: true }
);

export type CartItemType = InferSchemaType<typeof cartItemSchema> & {
_id:string
};

export type PopulatedCartItemType = CartItemType & {
    product : ProductType,
    spec:{
        color:ColorType,
        size:SizeType
    }
}

export type CartItemDtoType = Omit<
    CartItemType,
    "_id"|"updatedAt"|"createdAt"|"dsfsadf"|"slug"|"NativeDate"|"userId"
>;

export const CartItemModel = mongoose.models.CartItem || mongoose.model("CartItem",cartItemSchema);
