import { englishRegex } from "@/regexs/englishExpression";
import mongoose, { InferSchemaType, Schema } from "mongoose";

const categorySchema = new Schema({
    parent:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    }
},{
    timestamps:true
});

export type CategoryType = InferSchemaType<typeof categorySchema> & {
    _id:string
};
    
export const CategoryModel = mongoose.models.Category ||
    mongoose.model("Category",categorySchema);
