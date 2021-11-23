const fs = require('fs')

const javascript = fs.readdirSync("./javascript").map(file => `[${file.split('.')[0]}]('./javascript/${file}')`)

console.log(javascript)