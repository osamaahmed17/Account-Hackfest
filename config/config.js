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
        "clientId": "771217636998-ameuj7kr9ao0semh580gj609rlgitt88.apps.googleusercontent.com",
        "clientSecret": "BSk3xqxFQ2aA0LK7wOjdZgz3",
        "refreshToken": "1//04rEDk82Bx5_ACgYIARAAGAQSNwF-L9IrR-Ninq6uUnzSKv6UxhQBEDIEfzgYpGr5fvR0UAlZepwVGhKc9CnmAEsEA7g5b2Bn_98",
        


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