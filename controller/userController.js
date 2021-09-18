const userModel = require('../model/userModel')
const bcrypt = require("bcrypt");
const validations = require('../validator/validations.js')
const schema = require('../validator/schema.js')
const config = require('../config/config.js')
const request = require('request')
const axios = require('axios')
const nodemailer = require("../config/nodemailer.config.js");





class userController {
    constructor() {
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);



        this.response = {
            success: true,
            responseCode: "T01",
            message_en: "The transaction was completed successfully.",
            data: []
        };

    }


    async sendMessage(req, res) {
        console.log()
    }




    async signUp(req, res) {
        const requestValidation = validations.verifySchema(
            schema[config.schema[this.constructor.name]],
            req.body
        );

        if (!requestValidation.success) {
            return res.status(400).send(requestValidation);
        }
        if (!(req.body.email && req.body.password)) {
            return res.status(400).send("Data is not correctly formatted");
        }



        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length)];
        }
        req.body.confirmationCode = token


        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let insertData;


        try {
            insertData = await userModel.getInstance().create(req.body);
        }
        catch (error) {
            return res.status(400).send({error:"Email is already in Use"});

        }
        nodemailer.sendConfirmationEmail(
            req.body.email,
            token
        );


        axios.get(config.MASTERDATALOGIN_CONFIGURATION, {
            params: {
                key: 'LOGIN_CREDENTIALS'
            }
        }).then((response) => {
            let clientId = response.data.data[0].value.clientId
            let clientSecret = response.data.data[0].value.clientSecret
            let audienceUser = response.data.data[0].value.audienceUser
            let grantType = response.data.data[0].value.grantType

            var options = {
                method: 'POST',
                url: config.AUTHTOKEN_CONNECTION,
                headers: { 'content-type': 'application/json' },
                body: '{"client_id":"' + clientId + '","client_secret":"' + clientSecret + '","audience":"' + audienceUser + '","grant_type":"' + grantType + '"}'
            }
            try {
                request(options, function (error, response, body) {
                    let accessResponse = {
                        success: true,
                        responseCode: "T01",
                        message_en: "The transaction was completed successfully.",
                        token: [],
                        data: []
                    };
                    accessResponse.token = body
                    accessResponse.data = insertData
                    if (insertData.error) return res.status(insertData.statusCode).send(insertData);
                    return res.status(201).send(accessResponse);
                });
            }
            catch (error) {
                return res.status(400).send(error);
            }
        })
    }


    async signIn(req, res) {
        var user = await userModel.getInstance().findOne({ email: req.body.email });
        var authorization = {
            method: 'get',
            url: 'https://sandbox.jsbl.com/v2/oauth-blb?grant_type=client_credentials',
            headers: {
                'Authorization': 'Basic MHlQSmRXaFlWckk0MzVTRjNBczhIT0YxMnJ2dkxWZE86YmpVVUY0TDFKeHpnWWpNdg=='
            }
        };
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (user.status != "Active") {
                return res.status(401).send({
                    message: "Pending Account. Please Verify Your Email!",
                });
            }
            if (validPassword) {
                axios.get(config.MASTERDATALOGIN_CONFIGURATION, {
                    params: {
                        key: 'LOGIN_CREDENTIALS'
                    }
                }).then((response) => {
                    let clientId = response.data.data[0].value.clientId
                    let clientSecret = response.data.data[0].value.clientSecret
                    let audienceUser = response.data.data[0].value.audienceUser
                    let grantType = response.data.data[0].value.grantType

                    var options = {
                        method: 'POST',
                        url: config.AUTHTOKEN_CONNECTION,
                        headers: { 'content-type': 'application/json' },
                        body: '{"client_id":"' + clientId + '","client_secret":"' + clientSecret + '","audience":"' + audienceUser + '","grant_type":"' + grantType + '"}'
                    }

                    let authorizationToken
                    axios(authorization)
                        .then(function (authorizationReponse) {
                            authorizationToken=authorizationReponse.data.access_token
                        }).then(function () {
                            try {
                                request(options, function (error, response, body) {
                                    let accessResponse = {
                                        success: true,
                                        responseCode: "T01",
                                        message_en: "The transaction was completed successfully.",
                                        token: [],
                                        authorization: [],
                                        data: []
                                    };
                                    user.password = undefined;
                                    accessResponse.token = body
                                    accessResponse.data = user
                                    accessResponse.authorization=authorizationToken
                                    if (error) throw new Error(error);
                                    return res.status(201).send(accessResponse);
                                });
                            }
                            catch (error) {
                                return res.status(401).send(error);
                            }
                        })

                
                })
            }
            else {
                return res.status(400).send("Invalid Password");
            }
        } else {
            return res.status(401).send("User does not exist");
        }
    }

}

module.exports = new userController;