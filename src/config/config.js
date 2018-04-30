var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
//Change Api Key here
const apiKey = "AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort";
db = {//womble is lazy
    loc: "localhost:5433/hellawickedfonts",
    user: "postgres",
    pass: "postgres"
}
// db = {//school's setup
//     loc: "localhost:5432/hellawickedfonts",
//     user: "postgres",
//     pass: "student"
// }
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
        icon_url:"https://www.gravatar.com/",
        apiKey:apiKey,
        dbInfo:db
    },
    test:{
        root:rootPath,
        paths:{
            data: rootPath+"/test/data/",
        },
        app:{
            name: 'hellawickedfonts'
        },
        icon_url:"https://www.gravatar.com/",
        apiKey:apiKey,
        port:3000,
        dbInfo:db
    }
}

module.exports= config;
