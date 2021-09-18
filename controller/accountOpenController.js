var axios = require('axios');
var moment = require('moment');
const userModel = require("../model/userModel")




class accountOpenController {
    constructor() {
        this.accountOpen = this.accountOpen.bind(this);
        this.response = {
            success: true,
            responseCode: "T01",
            message_en: "The transaction was completed successfully.",
            data: []
        };

    }
    async accountOpen(req, res) {
        let email = req.header('userEmail')
        let authorization = req.header('Authorization')
        await userModel.getInstance().findOne({
            email: email,
        }).then((user) => {
            if (!user) {
                res.status(404).send({ message: "User not found" });
                return;
            }

         let cnicIssuanceDate=req.body.cnicIssuanceDate
         let mobileNetwork=req.body.mobileNetwork
            var data = JSON.stringify({
                "AccountOpeningRequest": {
                    "MerchantType": user.merchantType,
                    "TraceNo": Math.floor(100000 + Math.random() * 900000),
                    "CompanyName": user.companyName,
                    "DateTime": moment().format("YYYYMMddHHmmss"),
                    "CnicIssuanceDate":cnicIssuanceDate,
                    "MobileNo":user.mobileNumber,
                    "MobileNetwork":mobileNetwork,
                    "CNIC": user.cnicNumber,
                    "EmailId":email

 
                }
            })
            var config = {
                method: 'post',
                url: 'https://sandbox.jsbl.com/v2/accountopening-blb',
                headers: {
                    'Authorization': 'Bearer ' + authorization,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
          
                    user.cnicIssuanceDate=cnicIssuanceDate
                    user.mobileNetwork=mobileNetwork
                
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
                    succesResponse.data =response.data.AccountOpeningResponse

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
module.exports = new accountOpenController;