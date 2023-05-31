
const fs = require('fs')

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (error) => {
        if(error){
            console.error('error', error)
        }
    })
}

const getBodyData = (request) => {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            request.on('data', (chunk) => {
                body += chunk.toString()
            })
    
            request.on('end', async () => {
                body = JSON.parse(body)
                resolve(body)
            })                    
        } catch (error) {
            reject(error)
        }
    })
}

const getParamsData = (request, urlRoute) => {
    return new Promise((resolve, reject) => {
        try {
            const { url } = request

            let params = {}
            if (urlRoute.match(':')) {
                const urlItems = url.split('/')
                const reference = urlRoute.split('/')

                reference.forEach((ref, index) => {
                    if (ref.match(':') && urlItems[index]) {
                        params[ref.replace(':', '')] = urlItems[index]
                    }
                })
            }
            resolve(params)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    writeDataToFile,
    getBodyData,
    getParamsData
}