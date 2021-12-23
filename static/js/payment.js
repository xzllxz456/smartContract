const express = require('express');
const router = express.Router();

router.get('', async(req, res, next) => {
    var wallet = getWallet();
    //const adminExists = await wallet.exists('admin');
});

/*
const express = require('express');
const router = express.Router();
//const https=require("https");
const fs = require('fs');
const path = require('path');


const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin, Gateway, ContractListener } = require('fabric-network');


// router.get('/connect', async(req, res, next) => {
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
    
//     // admin신원 증명서가 있는지 확인
//     const adminExists = await wallet.exists('admin');
//     if (!adminExists) {
//        // Enroll the admin user, and import the new identity into the wallet.
//        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
//        const identity = X509WalletMixin.createIdentity('Test1OrgMSP', enrollment.certificate, enrollment.key.toBytes());
//        wallet.import('admin', identity);
//        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
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
const req = require('express/lib/request');
const logger = sdkUtils.getLogger('APPLICATION');

/*GET
router.get('/connect', async(req, res, next) => {
    try{
        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const identity = X509WalletMixin.createIdentity('Test1OrgMSP', enrollment.certificate, enrollment.key.toBytes());
        wallet.import('admin', identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
 
        }

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true } });
 
            // Get the CA client object from the gateway for interacting with the CA.
            const ca = gateway.getClient().getCertificateAuthority();
            const adminIdentity = gateway.getCurrentIdentity();
 
            // Register the user, enroll the user, and import the new identity into the wallet.
            const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: 'user1', role: 'client' }, adminIdentity);
            const enrollment = await ca.enroll({ enrollmentID: 'user1', enrollmentSecret: secret });
            const userIdentity = X509WalletMixin.createIdentity('Test1OrgMSP', enrollment.certificate, enrollment.key.toBytes());
            wallet.import('user1', userIdentity);
            console.log('Successfully registered and enrolled admin user "user1" and imported it into the wallet');
        }
 
        res.json({"msg":"ok"});
    }catch(e){
        console.log(e);
        res.json({"msg":"connect error"});
    }
});



//지갑생성
/* .... */

/* invoke
// create
router.post('/send', async (req, res, next) => {
    try{
    console.log("createPayment : ", req.body.key);
    const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            await res.json({'msg':'연결부터 해주세요'});
            return;
        }
 
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });
 
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('testchannel1');
 
        // Get the contract from the network.
        const contract = network.getContract('payment');
 
        await contract.submitTransaction('CreatePaymentCc',`${req.body.key}`,`${req.body.pnumber}`,`${req.body.id}`
        ,`${req.body.store}`,`${req.body.name}`,`${req.body.product}`,`${req.body.price}`);
        console.log(`Transaction has been submitted`);
        res.json({'msg':'ok'});
    }catch(e){
        console.log(e);
        res.json({'msg':'send error'});
    }
    }
);
// update
// delete



/* query
//queryAll
router.get('/queryAll', async (req, res, next) => {
    try{
        console.log('Allquery....');
        const userExists = await wallet.exists('user1');
        
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            await res.json({'msg':'연결해주세요'});
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, {wallet, identity: 'user1', discovery: { enabled: false } });

        const network = await gateway.getNetwork('testchannel1');
        const contract = network.getContract('payment');
        const result = await contract.evaluateTransaction('ReadAllPaymentCc');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.json({'msg':result.toString()});
    } catch(e) {
        console.log(e);
        res.json({'msg':'query error'});
    }
});
//searchquery
router.post('/searchquery', async (req, res, next) => {
    try{
        console.log('searchquery....');
        console.log(`${req.body.key}`);
        const userExists = await wallet.exists('user1');
        
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            await res.json({'msg':'연결해주세요'});
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, {wallet, identity: 'user1', discovery: { enabled: false } });

        const network = await gateway.getNetwork('testchannel1');
        const contract = network.getContract('payment');
        const result = await contract.evaluateTransaction('ReadPaymentCc', `${req.body.pnumber}`);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.json({'msg':result.toString()});
    } catch(e) {
        console.log(e);
        res.json({'msg':'query error'});
    }
});


//testquery
router.get('/query', async (req, res, next) => {
    try {
        console.log("query...");
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            await res.json({'msg':'연결부터 해주세요'});
            return;
        } 
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });
 
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('testchannel1');
 
        // Get the contract from the network.
        const contract = network.getContract('payment');
       
        const result = await contract.evaluateTransaction('ReadPaymentCc','e');
 
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.json({'msg':result.toString()});
 
    } catch(e) {
        console.log(e);
        res.json({'msg':'query error'});
    }
});
*/
module.exports = router;
// read