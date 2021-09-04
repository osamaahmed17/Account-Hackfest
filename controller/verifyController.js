const userModel = require('../model/userModel')
const path = require('path');



class verifyController {
    constructor() {
        this.verifyUser = this.verifyUser.bind(this);
 


        this.response = {
            success: true,
            responseCode: "T01",
            message_en: "The transaction was completed successfully.",
            data: []
        };

    }

    
    async verifyUser(req, res) {
        await userModel.getInstance().findOne({
            confirmationCode: req.params.confirmationCode,
        })
            .then((user) => {
                if (!user) {
                    return res.sendFile(path.join(__dirname, '../public/pages/userFail.html'));
                }
                user.status = "Active";
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    return res.sendFile(path.join(__dirname, '../public/pages/userSuccess.html'));
                });
               
            })
            .catch((e) => console.log("error", e));
    }
}
module.exports = new verifyController;