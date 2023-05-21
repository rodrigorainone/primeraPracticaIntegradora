import { Router } from "express";

import ProductManagerMongo from "../dao/mongo/Managers/ProductsManagerMongo.js";
import CartsManagerMongo from "../dao/mongo/Managers/CartsManagerMongo.js";

const prod = new ProductManagerMongo();
const cart = new CartsManagerMongo();
const router = Router();


router.post('/', async (req,res)=>{
    await cart.createCart();
    res.send({status:"success",message:"Cart added"})
} )
router.get('/:cid',async (req,res)=>{
    const aux = await cart.getCartsByID(req.params.cid);
    if (!aux){
       return res.send("el producto no existe");
    }
    return res.send(aux);
})


router.post('/:cid/product/:pid', async (req,res)=>{
   const ProductId = await prod.getProductsByID(req.params.pid);
    if (ProductId!=='Not found'){
        const mensaje = await cart.agregarProductCart((req.params.cid),({"product":req.params.pid,"quantity":req.body.quantity || 1}))             
        return res.send({status:"success",message:mensaje})  
    }
    return res.send({status:"success",message:"Product no exist"})   
    

})

export default router;