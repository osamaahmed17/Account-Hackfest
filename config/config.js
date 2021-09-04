module.exports =
{

    "NODE_ENV":"production",
    "dbTest":"mongodb://osamaahmed17:Airuniversity17@glocallytest-shard-00-00.5vrjj.mongodb.net:27017,glocallytest-shard-00-01.5vrjj.mongodb.net:27017,glocallytest-shard-00-02.5vrjj.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-41pxah-shard-0&authSource=admin&retryWrites=true&w=majority",
    "dbProduction":"mongodb://osamaahmed17:Airuniversity17@glocally-shard-00-00.wsvsz.mongodb.net:27017,glocally-shard-00-01.wsvsz.mongodb.net:27017,glocally-shard-00-02.wsvsz.mongodb.net:27017/masterdata?ssl=true&replicaSet=atlas-6e5e3z-shard-0&authSource=admin&retryWrites=true&w=majority",
    "MASTERDATALOGIN_CONFIGURATION":"https://glocally-masterdata-uwawuosv7q-uc.a.run.app/rest/api/v1/masterdata/configuration",
    "AUTHTOKEN_CONNECTION":"https://glocally.eu.auth0.com/oauth/token",
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
        "user":"noreply@glocally.de",
        "port": 465,
        "secure": true,
        "type": "OAuth2",
        "clientId": "641042111705-0psiioos3vk6ontgh62077jlf7d68q9o.apps.googleusercontent.com",
        "clientSecret": "nSHUH_Vc6-Lb9NUM2nXb2D3x",
        "refreshToken": "1//04qpypYhK0p9gCgYIARAAGAQSNwF-L9IryGqokhYHIL1vkd_nrHpvlr-nChGGPgBBd83rhE7L0Cxvb5IdySsIAZqPk465WeZ-fzg",
        

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