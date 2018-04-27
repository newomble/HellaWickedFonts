var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
//Change Api Key here
const apiKey = "AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort";
var config = {
    development:{
        root:rootPath,
        paths:{
            data: rootPath+"/app/data/",
        },
        app:{
            name: 'hellawickedfonts'
        },
        port:3000,
        apiKey:apiKey
    },
    test:{
        root:rootPath,
        paths:{
            data: rootPath+"/test/data/",
        },
        app:{
            name: 'hellawickedfonts'
        },
        apiKey:apiKey,
        port:3000
    }
}

module.exports= config;