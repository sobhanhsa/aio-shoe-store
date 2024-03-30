import mongoose, { InferSchemaType, Schema } from "mongoose";


const cartItemSchema = new Schema({
    productId:{
        required:true,
        type:mongoose.Types.ObjectId
    },
    spec :{
        required:true,
        colorName:{
            type:String,
            required:true
        },
        Size:{
            type:Number,
            required:true
        }
    },
    userId:{
        required:true,
        type:mongoose.Types.ObjectId
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
