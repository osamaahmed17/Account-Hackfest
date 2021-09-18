const userModel = require("../model/userModel")
const config = require("../config/config.js")
var nodemailer = require("nodemailer");
var async = require("async");
var crypto = require("crypto");
const bcrypt = require("bcrypt");



class resetController {
    constructor() {
        this.resetUser = this.resetUser.bind(this);
        this.tokenUser = this.tokenUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);
        this.updateUserInformation = this.updateUserInformation.bind(this);



        this.response = {
            success: true,
            responseCode: "T01",
            message_en: "The transaction was completed successfully.",
            data: []
        };

    }

    async resetUser(req, res) {
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                userModel.getInstance().findOne({ email: req.body.email }, function (err, user) {
                    if (!user) {
                        return res.status(400).send({ error: "No account with that email address exists." });
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000;
                    user.save(function (err) {
                        done(err, token, user);
                    });
                });
            },
            function (token, user, done) {
                var smtpTransport = nodemailer.createTransport({
                    host: config.nodeMail.host,
                    port: config.nodeMail.port,
                    secure: config.nodeMail.secure,
                    auth: {
                        type: config.nodeMail.type,
                        user: config.nodeMail.user,
                        clientId: config.nodeMail.clientId,
                        clientSecret: config.nodeMail.clientSecret,
                        refreshToken: config.nodeMail.refreshToken,
                        accessToken: config.nodeMail.accessToken
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: config.nodeMail.user,
                    subject: 'Password Reset',
                    html: `<!DOCTYPE html>
                    <html>
                    <head>
                        <title></title>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <style type="text/css">
                            @media screen {
                                @font-face {
                                    font-family: 'Montserrat';
                                    font-style: normal;
                                    font-weight: 400;
                                    src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/Montserrat/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                }
                    
                                @font-face {
                                    font-family: 'Montserrat';
                                    font-style: normal;
                                    font-weight: 700;
                                    src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/Montserrat/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                }
                    
                                @font-face {
                                    font-family: 'Montserrat';
                                    font-style: italic;
                                    font-weight: 400;
                                    src: local('Montserrat Italic'), local('Montserrat-Italic'), url(https://fonts.gstatic.com/s/Montserrat/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                }
                    
                                @font-face {
                                    font-family: 'Montserrat';
                                    font-style: italic;
                                    font-weight: 700;
                                    src: local('Montserrat Bold Italic'), local('Montserrat-BoldItalic'), url(https://fonts.gstatic.com/s/Montserrat/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                }
                            }
                    
                            /* CLIENT-SPECIFIC STYLES */
                            body,
                            table,
                            td,
                            a {
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                            }
                    
                            table,
                            td {
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                            }
                    
                            img {
                                -ms-interpolation-mode: bicubic;
                            }
                    
                            /* RESET STYLES */
                            img {
                                border: 0;
                                height: auto;
                                line-height: 100%;
                                outline: none;
                                text-decoration: none;
                            }
                    
                            table {
                                border-collapse: collapse !important;
                            }
                    
                            body {
                                height: 100% !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                width: 100% !important;
                            }
                    
                            /* iOS BLUE LINKS */
                            a[x-apple-data-detectors] {
                                color: inherit !important;
                                text-decoration: none !important;
                                font-size: inherit !important;
                                font-family: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                            }
                    
                            /* MOBILE STYLES */
                            @media screen and (max-width:600px) {
                                h1 {
                                    font-size: 32px !important;
                                    line-height: 32px !important;
                                }
                            }
                    
                            /* ANDROID CENTER FIX */
                            div[style*="margin: 16px 0;"] {
                                margin: 0 !important;
                            }
                        </style>
                    </head>
                    
                    <body style="background-color: #295CF5; margin: 0 !important; padding: 0 !important;">
                        <!-- HIDDEN PREHEADER TEXT -->
                        <div
                            style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Montserrat', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                            We're thrilled to have you here! Get ready to dive into your new account. </div>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <!-- LOGO -->
                          
                            <tr>
                                <td bgcolor="#295CF5" align="center" style="padding: 0px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" valign="top"
                                                style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#295CF5" align="center" style="padding: 0px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td bgcolor="#ffffff" align="left"
                                                style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <p style="margin: 0;">You are receiving this because you (or someone else) have requested the reset of the password for your account. Just press the button below.</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td bgcolor="#ffffff" align="left">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td align="center" style="border-radius: 3px;" bgcolor="#295CF5"><a
                                                                            href="https://hackfest2021.herokuapp.com/session/resetPass/${token}" target="_blank"
                                                                            style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #295CF5; display: inline-block;">Reset
                                                                            Password</a></td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr> <!-- COPY -->
                                
                                        <tr>
                                            <td bgcolor="#ffffff" align="left"
                                                style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <p style="margin: 0;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td bgcolor="#ffffff" align="left"
                                                style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Montserrat', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <p style="margin: 0;">Cheers,<br>Watson Blue Team</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>`
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    done(err, 'done');
                    return res.status(201).send({ message: "An e-mail has been sent to " + user.email + " with further instructions." });
                });
            }
        ], function (err) {
            if (err) {
                return res.status(500).send({ error: "Internal Error" });
            }
        });
    }

    async tokenUser(req, res) {
        await userModel.getInstance().findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
            if (!user) {
                return res.status(400).send({ error: "Password reset token is invalid or has expired." });


            }
            return res.status(201).send({ message: "User has been found" });
        });
    }

    async updateUser(req, res) {
        const salt = await bcrypt.genSalt(10);
        var password = await bcrypt.hash(req.body.password, salt);
        async.waterfall([
            function (done) {
                userModel.getInstance().findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                    if (!user) {
                        return res.status(400).send({ error: "Password reset token is invalid or has expired." });

                    }
                    user.password = password
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    user.save(function (err) {
                        done(err, user);
                    });
                });
            },
            function (user, done) {
                var smtpTransport = nodemailer.createTransport({
                    host: config.nodeMail.host,
                    port: config.nodeMail.port,
                    secure: config.nodeMail.secure,
                    auth: {
                        type: config.nodeMail.type,
                        user: config.nodeMail.user,
                        clientId: config.nodeMail.clientId,
                        clientSecret: config.nodeMail.clientSecret,
                        refreshToken: config.nodeMail.refreshToken,
                        accessToken: config.nodeMail.accessToken
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: config.nodeMail.user,
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    done(err, 'done');
                    return res.status(201).send({ message: "Your password has been changed" });
                });
            }
        ], function (err) {
            if (err) {
                return res.status(500).send({ error: "Internal Error" });
            }
        });

    }

    async updatePassword(req, res) {
        const salt = await bcrypt.genSalt(10);
        var userEmail = req.header('userEmail')
        var password = await bcrypt.hash(req.body.password, salt);
      
        async.waterfall([
            function (done) {

                userModel.getInstance().findOne({ email: userEmail }, function (err, user) {
                    if (!user) {
                        return res.status(400).send("No user exist");

                    }
                    else {
                        bcrypt.compare(req.body.currentPassword, user.password, function (err, response) {
                            if (response == true) {
                                user.password = password
                                user.save(function (err) {
                                    
                                    done(err, user)
                                    user.password= undefined
                                    user._id= undefined
                                    user.confirmationCode=undefined
                                    let response = {
                                        success: true,
                                        responseCode: "T01",
                                        message_en: "The transaction was completed successfully.",
                                        data: []
                                    };
                                    response.data= user
                                   return res.status(201).send(response);
                                });
                            }
                            else {

                                return res.status(400).send("The password doesn't match");
                            }

                        });
                    }
                  
                });
            },

        ], function (err) {
            if (err) {
                return res.status(400).send("Internal Error");
            }
        });

    }

    async confirmPassword(req, res) {
        const salt = await bcrypt.genSalt(10);
        var userEmail = req.header('userEmail')

        async.waterfall([
            function (done) {
                userModel.getInstance().findOne({ email: userEmail }, function (err, user) {
                    if (!user) {
                        return res.status(400).send("No user exist");

                    }
                    else {
                        bcrypt.compare(req.body.password, user.password, function (err, response) {
                            if (response == true) {
                                return res.status(201).send("Your password matches");
                            }
                            else {
                                return res.status(400).send("The password doesn't match");
                            }

                        });
                    }

                });
            },

        ], function (err) {
            if (err) {
                return res.status(400).send("Internal Error");
            }
        });

    }




    async updateUserInformation(req, res) {
        var userEmail = req.header('userEmail')
        var postalCode = req.body.postalCode
        var city = req.body.city
        async.waterfall([
            function (done) {
                userModel.getInstance().findOne({ email: userEmail }, function (err, user) {
                    if (!user) {
                        return res.status(400).send("No user exist");

                    }
                    user.postalCode = postalCode
                    user.city = city
                    user.save(function (err) {
                        done(err, user);
                        
                            user.password= undefined
                            user._id= undefined
                            user.confirmationCode=undefined
                            let response = {
                                success: true,
                                responseCode: "T01",
                                message_en: "The transaction was completed successfully.",
                                data: []
                            };
                            response.data= user
                           return res.status(201).send(response);
                    

                    });
                });
            },

        ], function (err) {
            if (err) {
                return res.status(400).send("Internal Error");
            }
        });

    }
}

module.exports = new resetController;