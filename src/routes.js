const { getProducts, getProduct, createProduct } = require('./controllers/productController')

const routes = [
    {
        url: '/api/products',
        method: 'GET',
        controller: getProducts
    },
    {
        url: '/api/products/:id',
        matchUrl: '/api/products/([\\w]+)',
        method: 'GET',
        controller: getProduct
    },
    {
        url: '/api/products',
        method: 'POST',
        controller: createProduct
    },
]

module.exports = { routes }