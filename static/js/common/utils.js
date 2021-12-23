
var getWallet = function() {
    var path = require('path').join(process.cwd(), 'wallet');
    return new FileSystemWallet(path);
}

var getCaUtils = function() {
    var path = require('path').join(process.cwd(), 'config/connection.json');
    var json = require('fs').readFileSync(path, 'utf8');
    var jsonStr = JSON.parse(json);
    const caURL = jsonStr.certificateAuthorities['ca.test1.test'].url;
    return new FabricCAServices(caURL);
}

var getLogger = function() {
    return require('fabric-client/lib/utils.js').getLogger('APPLICATION');
}