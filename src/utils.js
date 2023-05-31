
const fs = require('fs')

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (error) => {
        if(error){
            console.error('error', error)
        }
    })
}

const getPostData = (request) => {
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

module.exports = {
    writeDataToFile,
    getPostData
}