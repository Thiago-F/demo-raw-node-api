
const Product = require('../models/productModel')
const { getPostData } = require('../utils')

const getProducts = async (request, response) => {
    try {
        const products = await Product.findAll()

        response.writeHead(200, undefined, {'Content-Type': 'application/json'})
        return response.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

const getProduct = async (request, response, id) => {
    try {
        const product = await Product.findById(id)

        if(!product) {
            response.writeHead(404, undefined, {'Content-Type': 'application/json'})
            return response.end(JSON.stringify({ message: 'Product not found' }))
        }

        response.writeHead(200, undefined, {'Content-Type': 'application/json'})
        return response.end(JSON.stringify(product))
    } catch (error) {
        console.log(error)
    }
}

const createProduct = async (request, response) => {
    try {        
        const body = await getPostData(request)
        const { name, description, priceInCents } = body
        
        const productData = {
            name, 
            description, 
            priceInCents
        }

        const product = await Product.create(productData)
        response.writeHead(201, undefined, {'Content-Type': 'application/json'})
        return response.end(JSON.stringify(product))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct
}