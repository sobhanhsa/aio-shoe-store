import mongoose, { InferSchemaType, Schema } from "mongoose";


const cartItemSchema = new Schema({
    slug:{
        unique:true,
        requirled:true,
        type:String
    },
    spec :{
        required:true,
        type:{
            _id:false,
            colorName:{
                type:String,
                required:true
            },
            size:{
                type:Number,
                required:true
            },
            userId:{
                required:true,
                type:mongoose.Types.ObjectId
            },
            productId:{
                required:true,
                type:mongoose.Types.ObjectId
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

export const CartItemModel = mongoose.models.CartItem || mongoose.model("CartItem",cartItemSchema);
