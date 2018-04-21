var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');;

var config = {
    development:{
        root:rootPath,
        paths:{
            data: rootPath+"/app/data/",
        },
        app:{
            name: 'hellawickedfonts'
        },
        port:3000
    },
    test:{
        root:rootPath,
        paths:{
            data: rootPath+"/test/data/",
        },
        app:{
            name: 'hellawickedfonts'
        },
        port:3000
    }
}

module.exports= config;