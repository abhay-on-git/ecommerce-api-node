const productService = require('../services/product.service')

const createProduct = async (req,res)=>{
   try {
    const product = await productService.createProduct(req.body)
    return res.status(201).send(product)
   } catch (error) {
    res.status(500).send({error:error.message})
   }
}

const deleteProduct = async (req,res)=>{
   try {
    const product = await productService.deleteProduct(req.params.id)
    return res.status(201).send(product)
   } catch (error) {
    res.status(500).send({error:error.message})
   }
}

const updateProduct = async (req,res)=>{
   try {
    const product = await productService.updateProduct(req.params.id,req.body)
    return res.status(201).send(product)
   } catch (error) {
    res.status(500).send({error:error.message})
   }
}

const findProductById = async (req,res)=>{
   try {
    const product = await productService.findProductById(req.params.id)
    return res.status(201).send(product)
   } catch (error) {
    res.status(500).send({error:error.message})
   }
}

const getAllProducts = async (req,res)=>{
   try {
    const products = await productService.getAllProducts(req.query)
    return res.status(201).send(products)
   } catch (error) {
    res.status(500).send({error:error.message})
   }
}

const createMultipleProduct = async (req,res)=>{
    try {
     await productService.createMultipleProducts(req.body)
     return res.status(201).send({messages:"products created succesfully"})
    } catch (error) {
     res.status(500).send({error:error.message})
    }
 }

 module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultipleProduct
 }