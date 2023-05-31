
const products = require('../../data/database')
const { writeDataToFile } = require('../utils')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const findProduct = products.find(product => product.id === Number(id))
        resolve(findProduct)
    })
}

const create = (data) => {
    return new Promise((resolve, reject) => {
        const lastIndex = products[products.length - 1]
        const newProduct = { id: lastIndex.id + 1, ...data }
        products.push(newProduct)
        writeDataToFile(`${__dirname}/../../data/database.json`, products)
        resolve(newProduct)
    })
}

const updateById = (id, data) => {
    return new Promise((resolve, reject) => {
        const updatedProduct = { id, ...data }
        const updatedProducts = products.map(product => product.id === id ? updatedProduct : product)
        writeDataToFile(`${__dirname}/../../data/database.json`, updatedProducts)
        resolve(updatedProduct)
    })
}

const removeById = (id) => {
    return new Promise((resolve, reject) => {
        const updatedProducts = products.filters(product => product.id !== id)
        writeDataToFile(`${__dirname}/../../data/database.json`, updatedProducts)
        resolve(updatedProduct)
    })
}

module.exports = { findAll, findById, create, updateById, removeById }