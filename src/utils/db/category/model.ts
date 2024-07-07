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
        unique:true
    },
    titleEn:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v:any) {
                return englishRegex.test(v);
            },
            message: (props:any) => `
                ${props.value} is not a english expression
            `
        },
    },
    // must be in english
    slug:{
        
        type:String,
        required:true,
        unique:true,

        validate: {
            validator: function(v:any) {
                return englishRegex.test(v);
            },
            message: (props:any) => `
                ${props.value} is not a english expression
            `
        },
    }
},{
    timestamps:true
});

export type CategoryType = InferSchemaType<typeof categorySchema> & {
    _id:string
};
    
export const CategoryModel = mongoose.models.Category ||
    mongoose.model("Category",categorySchema);
