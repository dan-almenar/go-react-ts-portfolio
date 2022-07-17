const fs = require('fs')

const serverDistFolder = './cmd/apigateway/dist'
const clientDistFolder = '../client/dist'

const deleteFolder = (folder) => {
    if (fs.existsSync(folder)) {
        fs.readdirSync(folder).forEach(file => {
        const curPath = `${folder}/${file}`
        if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolder(curPath)
        } else {
            fs.unlinkSync(curPath)
        }
        })
        fs.rmdirSync(folder)
        console.log(`${folder} deleted`)
    } else {
        console.log(`${folder} does not exist`)
    }
}

if (fs.existsSync(serverDistFolder)) {
    deleteFolder(serverDistFolder)
}

// create dist folder for server
fs.mkdirSync(serverDistFolder)

// move client dist folder to server dist folder
fs.renameSync(clientDistFolder, serverDistFolder)
console.log("dist folder successfully moved...")