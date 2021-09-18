const userModel = require('../model/userModel')
var crypto = require("crypto");
var moment = require('moment');
var path = require("path");
var fs = require("fs");
var axios = require('axios');


class otpController {
    constructor() {
        this.otpGenerator = this.otpGenerator.bind(this);



        this.response = {
            success: true,
            responseCode: "T01",
            message_en: "The transaction was completed successfully.",
            data: []
        };

    }


    async otpGenerator(req, res) {

        let email = req.header('userEmail')
        let authorization = req.header('Authorization')
        await userModel.getInstance().findOne({
            email: email,
        }).then((user) => {
            if (!user) {
                res.status(404).send({ message: "User not found" });
                return;
            }
            // const publicKey = fs.readFileSync("./jspublicKey.pem");
            // var buffer = Buffer.from(req.body.pin);
            // const encrypted = crypto.publicEncrypt(publicKey, buffer);
            // const encryptedBase64 = encrypted.toString("base64")
            console.log(user.merchantType)
            console.log({
                "GenerateOtpResponse":
                {
                    "MerchantType" : "0088",
                    "TraceNo": Math.floor(100000 + Math.random() * 900000),

                    "CNIC": user.cnicNumber,

                    "MobileNo": user.mobileNumber,

                    "DateTime": moment().format("YYYYMMddHHmmss"),

                    "CompanyName": user.companyName ,

                    "Reserved1": user.reservedOne,

                    "TransactionType": "01"


                }

            })
            var data = JSON.stringify({
                "GenerateOtpResponse":
                {
                    "MerchantType" : "0088",
                    "TraceNo": Math.floor(100000 + Math.random() * 900000),
                    "CNIC": user.cnicNumber,
                    "MobileNo": user.mobileNumber,
                    "DateTime": moment().format("YYYYMMddHHmmss"),
                    "CompanyName": user.companyName ,
                    "Reserved1": user.reservedOne,
                    "TransactionType": "01"
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
module.exports = new otpController;


