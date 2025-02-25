const express = require('express');
// const multer = require('multer');
const router = express.Router();

const userController = require('../controllers/userController');




router.get('/dashboard',userController.dashboardPage);

router.get('/accounthistory/:id',userController.accounHistoryPage);

router.get('/localtransfer',userController.localtransferPage);
router.post('/localtransfer/:id',userController.localtransferPage_post);

router.get('/account-settings',userController.accountPage);
router.post('/account-settings/:id',userController.accountPage_post);

router.get('/nok',userController.nokPage);
router.post('/nok/:id',userController.nokPage_post);

router.get('/job',userController.jobPage);
router.post('/job/:id',userController.jobPage_post);

router.get('/samebank-transfer',userController.samebankPage);

router.post('/samebank-transfer/:id',userController.samebankPage_post);

router.get('/Statement/:id',userController.statementPage);

router.get('/atm-location',userController.atmPage);

router.get('/ChangePin',userController.ChangePinPage);

router.post('/ChangePin/:id',userController.ChangePinPage_post);

router.get('/ChangePwd',userController.ChangePwdPage);

router.post('/ChangePwd/:id',userController.ChangePwdPage_post);

router.get('/support',userController.supportPage);
router.post("/support/:id", userController.supportPage_post)


router.get('/internationaltransfer',userController.internationaltransferPage);
router.post('/internationaltransfer/:id',userController.internationaltransferPage_post);
router.get('/loan',userController.loanPage);
router.post('/loan/:id',userController.loanPage_post);
router.get('/viewloan/:id',userController.viewloanPage);



// router.get('/buyCrypto', userController.buyCrypto)

module.exports = router;