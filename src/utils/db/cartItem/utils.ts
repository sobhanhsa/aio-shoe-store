import { CartItemType } from "./model";

export const slugMaker = (spec:CartItemType["spec"]) => {
    return `${spec.userId}${spec.productId}${spec.colorName}${spec.size}`
}