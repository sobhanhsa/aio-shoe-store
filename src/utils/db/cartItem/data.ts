import { connectToDB } from "@/utils/db/utils";
import { CartItemModel, CartItemType } from "./model";
import { slugMaker } from "./utils";
import mongoose from "mongoose";

export const findCartsByUserId = async(userId:string) => {
    try {
        await connectToDB();
        const cartItems : CartItemType[] = await CartItemModel.find({
            'spec.userId':new mongoose.Types.ObjectId(userId)
        });
        return cartItems
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