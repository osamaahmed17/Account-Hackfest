module.exports =
{

    "dbProduction":"mongodb://osamaahmed17:osamaahmed17@hackfest-shard-00-00.bhrym.mongodb.net:27017,hackfest-shard-00-01.bhrym.mongodb.net:27017,hackfest-shard-00-02.bhrym.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-574kto-shard-0&authSource=admin&retryWrites=true&w=majority",
    "MASTERDATALOGIN_CONFIGURATION":"https://masterdata-hackfest-3alps67tda-uc.a.run.app/rest/api/v1/masterdata/configuration",
    "AUTHTOKEN_CONNECTION":"https://dev-v6aygfgf.us.auth0.com/oauth/token",
    "winston": {
        "file": {
            "level": "info",
            "filename": "./app.log",
            "handleExceptions": "true",
            "json": true,
            "maxsize": 5242880,
            "maxFiles": 5,
            "colorize": "false"
        },
        "console": {
            "level": "debug",
            "handleExceptions": true,
            "json": false,
            "colorize": true
        }
    },
    "nodeMail": {
        "host":"smtp.gmail.com",
        "user":"osamaahmedtahir170395@gmail.com",
        "port": 465,
        "secure": true,
        "type": "OAuth2",
        "clientId": "771217636998-q5dh5he4kmkvlfctir4acds2d5qefrj5.apps.googleusercontent.com",
        "clientSecret": "cIyb-fiDs1d6vpgONXNHJTVB",
        "refreshToken": "1//04vPbJ7uUGceJCgYIARAAGAQSNwF-L9IrGLUmouHc17_k-P7SxYodA9yVh9oys9B4SVd8VpH0kZrU3mocai25Ydabpe5f5Xk9Zn0",
        


    },
    "cache": {
        "server": "datagrid",
        "port": 11222,
        "cacheName": "jazzcash",
        "responseCodeCache": "ResponseCodeCache",
        "url": "http://datagrid:11222/rest/v2/caches/"
    },
    "cache_New": {
        "server": "datagrid",
        "port": 11222,
        "cacheName": "jazzcash",
        "responseCodeCache": "ResponseCodeCache_New"
    },
    "mongoModel": {
        "users": {
            "masterDataCache": false,
            "cacheList": true,
            "cacheKey": "userList",
            "cacheName": "ConfigurationCache",
            "hasLocation": false
        }
    },

    "schema": {
        "userController": "USER_SCHEMA"
    },
    "updateSchema": {
        "userController": "Bank_Update_SCHEMA"
    }

}