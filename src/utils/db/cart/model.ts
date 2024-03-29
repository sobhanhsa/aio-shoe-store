import mongoose, { InferSchemaType, Schema } from "mongoose";


const cartSchema = new Schema({
    products:{
        required:true,
        type:[{
            productId:{
                required:true,
                type:mongoose.Types.ObjectId
            },
            quantity:{
                required:true,
                type:Number
            }
        }]
    }
},
{ timestamps: true }
);

export type CartType = InferSchemaType<typeof cartSchema> & {
_id:string
};

export const CartModel = mongoose.models.Cart || mongoose.model("Cart",cartSchema);
