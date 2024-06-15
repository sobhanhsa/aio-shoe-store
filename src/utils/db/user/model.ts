import mongoose, { InferSchemaType, Schema } from "mongoose";


const userSchema = new Schema({
    username:{
        unique:true,
        type:String,
        required:true
    },
    email:{
        unique:true,
        type:String,
        required:true
    },
    hash:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},
{ timestamps: true }
);

export type UserType = InferSchemaType<typeof userSchema> & {
_id:string
};

export const UserModel = mongoose.models.User || mongoose.model("User",userSchema);
