import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";

let app = express();

//Connect to DB
ConnectDB();

app.get("/", async(req, res)=>{
    try {
        let item = {
            userId: "123456789",
            contactId: "98765432123459"
        }
        let contact =await ContactModel.createNew(item);
        res.send(contact);
    } catch (error) {
        console.log(error)
    }
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>{
    console.log(`Hello Duy Nguyen,Im running at: ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
})
