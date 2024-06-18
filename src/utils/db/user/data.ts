import { connectToDB } from "../utils"
import { UserModel, UserType } from "./model";

export const GetUserById = async(id:string) => {
    
    
    try{
        await connectToDB();
        const user = await UserModel.findById(id).select("-hash");
        return user
    }catch(err:any){
        console.log("utils db GetUserById-error : ",err.message);
        
        throw err.message
    }


}