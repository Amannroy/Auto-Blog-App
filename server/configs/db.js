import mongoose from "mongoose";

const connecetDB = async() => {
    try{
        mongoose.connection.on('connected', () => 
            console.log("Database Connected")
        );
       await mongoose.connect(`${process.env.MONGODB_URI}/autoblog`)
    }catch(error){
        console.log(error.message);
        
    }
}

export default connecetDB;