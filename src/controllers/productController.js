
const Product = require('../models/productModel')
const { getBodyData } = require('../utils')

const getProducts = async (request, response) => {
    try {
        const products = await Product.findAll()

        response.writeHead(200, undefined, {'Content-Type': 'application/json'})
        return response.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

const getProduct = async (request, response) => {
    try {
        const { id } = request.params
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
        console.log('req.body', request.body)

        // const body = await getBodyData(request)
        const { name, description, priceInCents } = request.body
        
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