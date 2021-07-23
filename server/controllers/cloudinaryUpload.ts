require("dotenv").config({ path: "../.env" });
import e from "express";
const app = e();
app.use(e.json({ limit: '50mb'}))
app.use(e.urlencoded({ limit: '50mb', extended:true}));

module.exports = {
    addImage: async (req, res) => {
        try{
            const fileStr = req.body.data
        } catch (error) {
            console.log(error)
        }
    }
}