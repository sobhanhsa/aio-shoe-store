import mongoose, { InferSchemaType, Schema } from "mongoose";


const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    cart:{
        type:[mongoose.Types.ObjectId],
        required:true
    }
},
{ timestamps: true }
);

export type UserType = InferSchemaType<typeof userSchema> & {
_id:string
};

export const UserModel = mongoose.models.User || mongoose.model("User",userSchema);
