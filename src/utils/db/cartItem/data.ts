import { connectToDB } from "@/utils/db/utils";
import { CartItemModel, CartItemType } from "./model";
import { slugMaker } from "./utils";

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