import productModel from "../models/product.js";
import mongoose from "mongoose";


export default class ProductManagerMongo {
    
    getProducts = (cantidad) => {
       return productModel.find().limit(cantidad).lean();
    }   


    getProductsBy = (params)=>{
        return productModel.findOne(params);
    }
    getProductsByID =  (id)=>{
        const idValido = new mongoose.Types.ObjectId(id);
        return productModel.findOne({'_id':idValido});
        
    }
        
    

    createProduct = (product) => {
        
        return productModel.create(product);
    }

    updateProduct = (id,product)=>{
        const idValido = new mongoose.Types.ObjectId(id);
        return productModel.findByIdAndUpdate({'_id':idValido},{$set:product})
    }

    deleteProduct = (id)=>{
        const idValido = new mongoose.Types.ObjectId(id);
        return productModel.findOneAndDelete({_id:idValido});
    }

 }

  











