import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.Connection

        connection.on('connected', ()=> {
            console.log("Connection was successfull")
        })

        connection.on('error', (err: any) => {
            console.log('Connection was not successfull. Make sure MongodDB is connection', + err);
            process.exit()
        })
    }catch(error){
        console.log('something went wrong');
        console.error(error)
    }
}