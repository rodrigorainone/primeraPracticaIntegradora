import mongoose from "mongoose";

const collection = "products";

const schema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    thumbnail:Array,
    code:String,
    stock:Number,
    category:String,
    status:Boolean
})

const productModel = mongoose.model(collection,schema)

export default productModel;