import { connectToDB } from "@/utils/db/utils";
import { CartItemModel, CartItemType } from "../cartItem/model";

export const findCartByUserId = async(userId:string) => {
    try {
        await connectToDB();
        const cartItems : CartItemType[] = await CartItemModel.find({
            userId:userId
        });
    } catch (err:Error&any) {
        throw err;
    }
}

export const createCartItem = async (cartItem:CartItemType) => {
    try {
        await connectToDB();
        const createdCartItem = await CartItemModel.create({
            ...cartItem
        })
        return createCartItem
    } catch (err:Error&any) {
        throw err
    }
}