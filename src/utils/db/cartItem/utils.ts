import { CartItemType } from "./model";

export const slugMaker = ({
    userId,productId,colorId,sizeId
}:{
    userId:string,
    productId:string,
    colorId:string,
    sizeId:string,
}) => {
    return `${userId}${productId}${colorId}${sizeId}`
}