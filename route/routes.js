const userController = require('../controller/userController')
const verifyController = require('../controller/verifyController')
const resetController = require('../controller/resetController')
const authenticateController=require('../controller/authenticateController')
const accountOpenController=require('../controller/accountOpenController')


module.exports = (app) => {
    app.post('/rest/api/v1/accountOpen',accountOpenController.accountOpen)

    app.post('/rest/api/v1/authenticateUser',authenticateController.authenticateUser)
    app.post('/rest/api/v1/userSignUp', userController.signUp);
    app.post('/rest/api/v1/userSignIn', userController.signIn);
    app.get('/rest/api/v1/confirm/:confirmationCode', verifyController.verifyUser)
    app.post('/rest/api/v1/forgot', resetController.resetUser)
    app.post('/rest/api/v1/updatePassword', resetController.updatePassword)
    app.post('/rest/api/v1/updateUserInformation', resetController.updateUserInformation)
    app.post('/rest/api/v1/confirmPassword', resetController.confirmPassword)    
    app.get('/rest/api/v1/reset/:token', resetController.tokenUser)
    app.post('/rest/api/v1/reset/:token', resetController.updateUser)


};

