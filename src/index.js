const http = require('http')
const { getProducts, getProduct, createProduct } = require('./controllers/productController')

const PORT = 5000

const server = http.createServer((request, response) => {
    
    // simple request handler
    /**
     // set generic response code for all requests
     response.statusCode = 200
 
     // set headers
     response.setHeader('Content-Type', 'text/html')
     response.write('<h1>Hello World</h1>')
     response.end()     
    */

    if(request.url === '/api/products' && request.method === 'GET') {
        return getProducts(request, response)
    }

    if(request.url.match(/\/api\/products\/([0-9]+)/) && request.method === 'GET') {
        const id = request.url.split('/')[3]
        return getProduct(request, response, id)
    }

    if(request.url === '/api/products' && request.method === 'POST') {
        return createProduct(request, response)
    }

    response.writeHead(404, undefined, {'Content-Type': 'application/json'})
    return response.end(JSON.stringify({ message: 'Rote not found' }))
})

server.listen(PORT, () => console.log(`Server is running in ${PORT} port`))