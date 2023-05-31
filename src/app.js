const { getBodyData, getParamsData } = require('./utils')
const { routes } = require('./routes')

const app = async (request, response) => {
    const { url, method } = request

    for (const route of routes) {
        if (method === route.method && url.match(new RegExp(route.matchUrl || route.url + '$'))) {
            const body = await getBodyData(request)
            const params = await getParamsData(request, route.url)

            request.body = body
            request.params = params

            return route.controller(request, response)
        }
    }

    response.writeHead(404, undefined, { 'Content-Type': 'application/json' })
    return response.end(JSON.stringify({ message: 'Rote not found' }))
}

module.exports = { app }