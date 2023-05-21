import {Router} from 'express'
import ProductManagerMongo from '../dao/mongo/Managers/ProductsManagerMongo.js';


const prod = new ProductManagerMongo();
const router = Router();

router.get('/',async (req,res)=>{
    if (req.query.limit === undefined){
        return res.send(await prod.getProducts())
    }
    else{
        if (!isNaN(parseInt(req.query.limit))){ 
            return res.send(await prod.getProducts(req.query.limit))
     }
    }
})

router.get('/:pid',async (req,res)=>{  

   const aux = await prod.getProductsByID(req.params.pid);
   if (!aux){
    return res.send("no existe el producto")
   }

    return res.send(aux)

})

router.post('/',async (req,res)=>{    
    const datos = req.body;
    const { title, description, price, thumbnail=[], code, stock,category, status } = datos
    if (title && description && price && status && code && stock && category ){
        await prod.createProduct(datos) 
        return res.send({status:"success"}) 
    }
    else {
        return res.send({status:"alguno de los campos no fue completado"}) 
    }
})


router.put('/:pid', async (req,res)=>{    
    const idAux = req.params.pid;
    const datos = req.body; 
    const aux = await prod.updateProduct(idAux,datos)     
    if (!aux){
        return res.send("no existe el producto a modificar")
    }   
    res.send({status:"success"})   

})

router.delete('/:pid', async (req,res)=>{
    const idAux = req.params.pid;
    const borrado = await prod.deleteProduct(idAux)    
    console.log()
    if (!borrado)  {
        return res.send({status:" no success"})
    }
    return res.send({status:"si success"})

})






export default router;