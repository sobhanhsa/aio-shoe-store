import { englishRegex } from "@/regexs/englishExpression";
import mongoose, { InferSchemaType, Schema } from "mongoose";

const colorSchema = new Schema({
    value:{
        type:String,
        requried:true,
        
    },
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

export type ColorType = InferSchemaType<typeof colorSchema> & {
    _id:string,
};

export const ColorModel = mongoose.models.Color ||
    mongoose.model("Color",colorSchema);
