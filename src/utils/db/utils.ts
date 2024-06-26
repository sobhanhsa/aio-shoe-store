import mongoose, { ConnectionStates, Model, MongooseError } from "mongoose";

const connection : {
    isConnected:ConnectionStates|null
} = {
    isConnected:null
}

export async function connectToDB() {
    try {        
        if (connection.isConnected) return;
        const db = await mongoose.connect(process.env.DB_URl as string);
        console.log("utils connectToDB : db initialized");
        connection.isConnected = db.connections[0].readyState;
        console.log(
            "utils connectToDB connections : ",
            connection.isConnected
        );
    } catch(error:any) {
        throw new Error(error);
    }
};


