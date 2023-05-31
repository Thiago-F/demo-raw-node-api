
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

module.exports = { findAll, findById, create }