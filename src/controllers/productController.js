
const Product = require('../models/productModel')
const { responseJson } = require('../utils')

const getProducts = async (request, response) => {
    try {
        const products = await Product.findAll()
        return responseJson(response, 200, products)
    } catch (error) {
        return responseJson(response, 500, { error: 'System Error' })
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

        return responseJson(response, 200, product)
    } catch (error) {
        return responseJson(response, 500, { error: 'System Error' })
    }
}

const createProduct = async (request, response) => {
    try {
        const { name, description, priceInCents } = request.body
        
        const productData = {
            name, 
            description, 
            priceInCents
        }

        const product = await Product.create(productData)
        return responseJson(response, 201, product)
    } catch (error) {
        return responseJson(response, 500, { error: 'System Error' })
    }
}

const updateProduct = async (request, response) => {
    try {
        const { id } = request.params
        const { name, description, priceInCents } = request.body

        const productData = {
            name,
            description,
            priceInCents
        }

        const product = await Product.updateById(Number(id), productData)
        return responseJson(response, 200, product)
    } catch (error) {
        return responseJson(response, 500, { error: 'System Error' })
    }
}

const removeProduct = async (request, response) => {
    try {
        const { id } = request.params

        const product = await Product.removeById(Number(id))
        return responseJson(response, 200, product)
    } catch (error) {
        return responseJson(response, 500, { error: 'System Error' })
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
}