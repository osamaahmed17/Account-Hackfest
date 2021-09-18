const userModel = require('../model/userModel')
var crypto = require("crypto");
var moment = require('moment');
var path = require("path");
var fs = require("fs");
var axios = require('axios');


class loginBankController {
    constructor() {
        this.loginAuthentication = this.loginAuthentication.bind(this);



        this.response = {
            success: true,
            responseCode: "T01",
            message_en: "The transaction was completed successfully.",
            data: []
        };

    }


    async loginAuthentication(req, res) {

        let email = req.header('userEmail')
        let authorization = req.header('Authorization')
        await userModel.getInstance().findOne({
            email: email,
        }).then((user) => {
            if (!user) {
                res.status(404).send({ message: "User not found" });
                return;
            }
            const publicKey = fs.readFileSync("./jspublicKey.pem");
            var buffer = Buffer.from("54531");
            const encrypted = crypto.publicEncrypt(publicKey, buffer);
            const encryptedBase64 = encrypted.toString("base64")
            var data = JSON.stringify({
                "LoginPinRequest": {

                    "processingCode": "LoginPin",
                    "merchantType": user.merchantType,
                    "traceNo": Math.floor(100000 + Math.random() * 900000),
                    "companyName": user.companyName,
                    "dateTime": moment().format("YYYYMMddHHmmss"),
                    "mobileNo": user.mobileNumber,
                    "channelId": user.companyName,
                    "terminalId": user.companyName,
                    "loginPin": encryptedBase64,
                    "reserved1": user.reservedOne,
                    "reserved2": ""
                }
            })
            var config = {
                method: 'post',
                url: "https://sandbox.jsbl.com/v2/generateotp-blb",
                headers: {
                    'Authorization': 'Bearer ' + authorization,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    let succesResponse = {
                        success: true,
                        responseCode: "T01",
                        message_en: "The transaction was completed successfully.",
                        data: []
                    };
                    succesResponse.data = response.data
                    return res.status(200).send(succesResponse);


                })
                .catch(function (error) {
                    console.log(error)
                    return res.status(500).send(error);
                }).catch((e) => console.log("error", e));
        })

    }
}
module.exports = new loginBankController;


