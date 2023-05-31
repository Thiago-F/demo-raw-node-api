const { getProducts, getProduct, createProduct, updateProduct, removeProduct } = require('./controllers/productController')

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
    {
        url: '/api/products/:id',
        matchUrl: '/api/products/([\\w]+)',
        method: 'PUT',
        controller: updateProduct
    },
    {
        url: '/api/products/:id',
        matchUrl: '/api/products/([\\w]+)',
        method: 'DELETE',
        controller: removeProduct
    },
]

module.exports = { routes }