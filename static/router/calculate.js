const express = require('express');
const router = express.Router();
/*
//const https=require("https");
const fs = require('fs');
const path = require('path');


const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin, Gateway, ContractListener } = require('fabric-network');


// router.get('/wallet', async(req, res, next) => {
//     const ccpPath = path.resolve(__dirname, '..' , 'basic_aticle', 'connection.json');
//    //ccp란 common connection profile의 약자
//     const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
//     const ccp = JSON.parse(ccpJSON);

//     // 인증기관과 통신할 수 있는 객체 생성
//     const caURL = ccp.certificateAuthorities['ca.test1.test'].url;
//     const ca = new FabricCAServices(caURL);

//     // 신원 증명서를 저장할 지갑 생성
//     const walletPath = path.join(process.cwd(), 'wallet');
//     const wallet = new FileSystemWallet(walletPath);
//     console.log(`Wallet path: ${walletPath}`);    
    
//     // admin1신원 증명서가 있는지 확인
//     const admin1Exists = await wallet.exists('admin1');
//     if (!admin1Exists) {
//        // Enroll the admin1 user, and import the new identity into the wallet.
//        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
//        const identity = X509WalletMixin.createIdentity('Test1OrgMSP', enrollment.certificate, enrollment.key.toBytes());
//        wallet.import('admin1', identity);
//        console.log('Successfully enrolled admin1 user "admin1" and imported it into the wallet');
//     }   
//     res.json({"msg":"ok"});

// });


const ccpPath = path.resolve(__dirname, '..', 'basic_aticle', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const caURL = ccp.certificateAuthorities['ca.test1.test'].url;
const ca = new FabricCAServices(caURL);

const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);

const sdkUtils = require('fabric-client/lib/utils.js');
const logger = sdkUtils.getLogger('APPLICATION');

router.get('/wallet', async(req, res, next) => {
    try{
        // Check to see if we've already enrolled the admin1 user.
        const admin1Exists = await wallet.exists('admin1');
        if (!admin1Exists) {
        // Enroll the admin1 user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const identity = X509WalletMixin.createIdentity('Test1OrgMSP', enrollment.certificate, enrollment.key.toBytes());
        wallet.import('admin1', identity);
        console.log('Successfully enrolled admin1 user "admin1" and imported it into the wallet');
        }

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user3');
        if (!userExists) {
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: 'admin1', discovery: { enabled: false } });
 
            // Get the CA client object from the gateway for interacting with the CA.
            const ca = gateway.getClient().getCertificateAuthority();
            const admin1Identity = gateway.getCurrentIdentity();
 
            // Register the user, enroll the user, and import the new identity into the wallet.
            const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: 'user3', role: 'client' }, admin1Identity);
            const enrollment = await ca.enroll({ enrollmentID: 'user3', enrollmentSecret: secret });
            const userIdentity = X509WalletMixin.createIdentity('Test1OrgMSP', enrollment.certificate, enrollment.key.toBytes());
            wallet.import('user3', userIdentity);
            console.log('Successfully registered and enrolled admin1 user "user3" and imported it into the wallet');
        }
 
        res.json({"msg":"ok"});
    }catch(e){
        console.log(e);
        res.json({"msg":"connect error"});
    }
});

router.post('/createCalcul', async (req, res, next) => {
    try{
    // console.log("CreateCalculCc : ", req.body.key);
    const userExists = await wallet.exists('user3');
        if (!userExists) {
            console.log('An identity for the user "user3" does not exist in the wallet');
            await res.json({'msg':'연결부터 해주세요'});
            return;
        }
 
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user3', discovery: { enabled: true } });
 
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('testchannel1');
 
        // Get the contract from the network.
        const contract = network.getContract('calcul');
        console.log(`${req.body.cnumber}`);
        await contract.submitTransaction('CreateCalculCc',`${req.body.key}`,`${req.body.cnumber}`,`${req.body.userid}`
        ,`${req.body.userprofile}`,`${req.body.totalrevenues}`,`${req.body.commision}`,`${req.body.revenues}`,`${req.body.clearingcommission}`,`${req.body.contractoption}`,`${req.body.salesinfo}`,`${req.body.distribution}`);
        console.log(`Transaction has been submitted`);
        res.json({'msg':'ok'});
    }catch(e){
        console.log(e);
        res.json({'msg':'send error'});
    }
    }
);


//Key get
router.post('/searchquery', async (req, res, next) => {
    try{
        console.log('searchquery....');
        console.log(`${req.body.key}`);
        const userExists = await wallet.exists('user3');
        
        if (!userExists) {
            console.log('An identity for the user "user3" does not exist in the wallet');
            await res.json({'msg':'연결해주세요'});
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, {wallet, identity: 'user3', discovery: { enabled: false } });

        const network = await gateway.getNetwork('testchannel1');
        const contract = network.getContract('calcul');
        const result = await contract.evaluateTransaction('ReadCalculCc', `${req.body.key}`);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.json({'msg':result.toString()});
    }catch{
        console.log(e);
        res.json({'msg':'query error'});
    }
});

//queryAll
router.get('/queryAllCalcul', async (req, res, next) => {
    try{
        console.log('Allquery....');
        const userExists = await wallet.exists('user3');
        
        if (!userExists) {
            console.log('An identity for the user "user3" does not exist in the wallet');
            await res.json({'msg':'연결해주세요'});
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, {wallet, identity: 'user3', discovery: { enabled: false } });

        const network = await gateway.getNetwork('testchannel1');
        const contract = network.getContract('calcul');
        const result = await contract.evaluateTransaction('ReadAllCalculCcCc');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.json({'msg':result.toString()});
    }catch{
        console.log(e);
        res.json({'msg':'query error'});
    }
});
*/
module.exports = router;
