import { connectToDB } from "../utils"
import { UserModel, UserType } from "./model";

export const GetUserById = async(id:string) => {
    
    await connectToDB();

    try{
        return await UserModel.findById(id).select("-hash");
    }catch(err:any){
        console.log("error in GetUserById : ",err.message);
        
        throw err.message
    }


}