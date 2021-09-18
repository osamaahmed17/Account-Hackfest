var axios = require('axios');
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
            let cnicNumber = req.body.cnicNumber
            let mobileNumber = req.body.mobileNumber
            let companyName = req.body.companyName
            let reservedOne = req.body.reservedOne
            let transactionType = req.body.transactionType
            var data = JSON.stringify({
                "VerifyAccountRequest": {
                    "MerchantType": merchantType,
                    "TraceNo": Math.floor(100000 + Math.random() * 900000),
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
                .then(function (response) {
          
                    user.userAuthentication = true
                    user.merchantType=merchantType
                    user.cnicNumber=cnicNumber
                    user.mobileNumber=mobileNumber
                    user.companyName=companyName
                    user.reservedOne=reservedOne

                    user.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                    });

                    let succesResponse = {
                        success: true,
                        responseCode: "T01",
                        message_en: "The transaction was completed successfully.",
                        data: []
                    };
                    succesResponse.data = response.data.VerifyAccountResponse
                    return res.status(200).send(succesResponse);

                })
                .catch(function (error) {
                 console.log(error)
                    return res.status(500).send(error);
                });

        }).catch(function (error) {
            return res.status(500).send(error);
        });
    }
}
module.exports = new authenticateController;