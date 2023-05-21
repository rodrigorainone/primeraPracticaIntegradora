import { Router } from "express";
import ProductManagerMongo from "../dao/mongo/Managers/ProductsManagerMongo.js";

const prod = new ProductManagerMongo();
const router = Router();

router.get ('/',async (req,res )=>{
    const product = await prod.getProducts();   
    res.render('home',{product,
        css:'home'})
})

router.get('/realtimeproducts', async (req,res)=>{       
    res.render('realTimeProducts',{
      css:'realtimeproducts'  
    });
})

router.get('/chat', async(req,res)=>{
  res.render('chat');
})



export default router;