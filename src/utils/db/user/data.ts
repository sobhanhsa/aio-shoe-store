import { CartModel, CartType } from "../cart/model";
import { ShoeModel } from "../shoe/model";
import { connectToDB } from "../utils"
import { UserModel, UserType } from "./model";

export const findCartByUserName = async(username:string) => {
    try {
        await connectToDB();
        const user : UserType = await UserModel.findOne({
            username
        }) as any;
        const rawCart : CartType = await CartModel
            .findById(user.cart) as any;
        
        const cardItems = rawCart.products
            .map(async p =>( 
                {
                quantity:       p.quantity,
                product : await ShoeModel.findById(p.productId)
            }));

        return cardItems
            
    } catch (err) {
        throw err
    }
}