require("dotenv").config({ path: "../.env" });
import e from "express";
//const {cloudinary} = require('./utils/cloudinary')

module.exports = {
    addImage: async (req, res) => {
        let {data}=req.body
        if(data){res.sendStatus(200)}
        else res.send("this is not working at all")
        // const uploadedResponse = await cloudinary.uploader.
        // upload(data, {
        //     upload_preset:'urkrcvju'
        // })
    }
}