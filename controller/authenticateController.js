var axios = require('axios');
const { repeat } = require('lodash');
var moment = require('moment');
const userModel = require("../model/userModel")




class authenticateController {
    constructor() {
        this.authenticateUser = this.authenticateUser.bind(this);



        this.response = {
            success: true,
            responseCode: "T01",
            message_en: "The transaction was completed successfully.",
            data: []
        };

    }


    async authenticateUser(req, res) {
        let email = req.header('userEmail')
        console.log(email)
        let authorization = req.header('Authorization')
        await userModel.getInstance().findOne({
            email: email,
        }).then((user) => {
            if (!user) {
                res.status(404).send({ message: "User not found" });
                return;
            }
            let merchantType = req.body.merchantType
            let traceNumber = req.body.traceNumber
            let cnicNumber = req.body.cnicNumber
            let mobileNumber = req.body.mobileNumber
            let companyName = req.body.CompanyName
            let reservedOne = req.body.reservedOne
            let transactionType = req.body.transactionType
            var data = JSON.stringify({
                "VerifyAccountRequest": {
                    "MerchantType": merchantType,
                    "TraceNo": traceNumber,
                    "CNIC": cnicNumber,
                    "MobileNo": mobileNumber,
                    "DateTime": moment().format("YYYYMMddHHmmss"),
                    "CompanyName": companyName,
                    "Reserved1": reservedOne,
                    "TransactionType": transactionType
                }
            })
            var config = {
                method: 'post',
                url: 'https://sandbox.jsbl.com/v2/verifyaccount-blb',
                headers: {
                    'Authorization': 'Bearer ' + authorization,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (data) {
                    let data2 = {
                        "VerifyAccountResponse": {
                            "MerchantType": "0088",
                            "TraceNo": "410108",
                            "CompanyName": "BIFILER",
                            "DateTime": "20210105201527",
                            "ResponseCode": "00",
                            "ResponseDetails": [
                                "Account exists"
                            ]
                        }
                    }
                    user.userAuthentication = true
                    user.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                    });

                    let response = {
                        success: true,
                        responseCode: "T01",
                        message_en: "The transaction was completed successfully.",
                        data: []
                    };
                    response.data = data2.VerifyAccountResponse
                    return res.status(200).send(response);

                })
                .catch(function (error) {
                    let data2 = {
                        "VerifyAccountResponse": {
                            "MerchantType": "0088",
                            "TraceNo": "410108",
                            "CompanyName": "BIFILER",
                            "DateTime": "20210105201527",
                            "ResponseCode": "00",
                            "ResponseDetails": [
                                "Account exists"
                            ]
                        }
                    }
                    user.userAuthentication = true
                    user.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                    });

                    let response = {
                        success: true,
                        responseCode: "T01",
                        message_en: "The transaction was completed successfully.",
                        data: []
                    };
                    response.data = data2.VerifyAccountResponse
                    return res.status(200).send(response);
                });

        }).catch(function (error) {
            console.log(error)
        });
    }
}
module.exports = new authenticateController;