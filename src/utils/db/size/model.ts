import { englishRegex } from "@/regexs/englishExpression";
import mongoose, { InferSchemaType, Schema } from "mongoose";

const sizeSchema = new Schema({
    value:Number,
    title:{
        type:String,
        required:true,
        unique:true
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

export const SizeModel = mongoose.models.Size ||
    mongoose.model("Size",sizeSchema);