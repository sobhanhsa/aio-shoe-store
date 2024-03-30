import { connectToDB } from "@/utils/db/utils";
import { CartItemModel, CartItemType } from "./model";
import { slugMaker } from "./utils";
import mongoose from "mongoose";
import { findCartShoe, findShoe } from "@/utils/db/shoe/data";
import { ShoeType } from "../shoe/model";

export type finalCartItem = CartItemType & {
    product:ShoeType,
    price:number
}

export const findCartsByUserId = async(userId:string) => {
    try {
        await connectToDB();
        const cartItems :  CartItemType[] = await CartItemModel.find({
            'spec.userId':new mongoose.Types.ObjectId(userId)
        });
        const finalCartItems = await Promise.all(cartItems.map(async(cI) => {
            const product : ShoeType = await findCartShoe(cI.spec.productId);
            const price =  product.prices.find(
                p => {
                    // console.log(p);
                    return(
                        p.colors.find(c => c.colorName === cI.spec.colorName) 
                        && 
                        p.sizes.find(s => s.size === cI.spec.size)
                    )
                }
            )?.price;
            return ({
            ...(cI as any)._doc,
            product,
            price
        })}));
        
        // console.log(finalCartItems);
        return finalCartItems
    } catch (err:Error&any) {
        throw err;
    }
}


export const createCartItem = async (cartItem:CartItemType) => {
    try {
        await connectToDB();
        const slug = slugMaker(cartItem.spec);
        const createdCartItem = await CartItemModel.create({
            ...cartItem,
            slug
        })
        return createdCartItem
    } catch (err:Error&any) {
        throw err
    }
}