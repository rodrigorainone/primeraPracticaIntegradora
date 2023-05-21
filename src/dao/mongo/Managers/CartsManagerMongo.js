import cartModel from "../models/carts.js";
import mongoose from "mongoose";

export default class CartsManagerMongo {

   
     createCart = ()=>{
        return  cartModel.create({"products":[]})
    } 

    getCartsByID = (params)=>{
        return cartModel.findOne({'_id':params});
    }

    agregarProductCart = async (idCart,producto) =>{
        const cartBuscado =  await this.getCartsByID(idCart);
        if (!cartBuscado){
            return "no existe el carrito"
        }
        else
            {     
                const ProductoEncontrado = await cartModel.findOne({
                    _id: idCart,
                    products: { $elemMatch: { product: new mongoose.Types.ObjectId(producto.product)} }
                  });
                if (!ProductoEncontrado) {
                    await cartModel.updateOne(
                        {_id:idCart},                    
                        {$push:{products:{product:new mongoose.Types.ObjectId(producto.product),quantity:producto.quantity}}}                
                        )
                    return "se agrego el producto nuevo"
                }
                else{                  
                    
                    await cartModel.updateOne(
                      { _id:idCart, "products.product": new mongoose.Types.ObjectId(producto.product) },
                      { $inc: { "products.$.quantity": producto.quantity } }
                    );
                    return "se modifico el quantity"
                    
                }
                  
                

        }
    }

}