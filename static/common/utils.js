module.exports.getAbsolutePath = function(relativePath) {
    return require('path').join(process.cwd(), relativePath);
}

module.exports.getJsonToString = function(jsonPath) {
    var path = this.getAbsolutePath(jsonPath);
    var json = require('fs').readFileSync(path, 'utf8');
    return JSON.parse(json);
}

module.exports.getWallet = function() {
    return new FileSystemWallet( this.getAbsolutePath('wallet') );
}

module.exports.getCaUtils = function() {    
    var json = this.getJsonToString('config/connection.json');
    var caURL = json.certificateAuthorities['ca.test1.test'].url;
    return new FabricCAServices(caURL);
}

module.exports.getLogger = function() {
    return require('fabric-client/lib/utils.js').getLogger('APPLICATION');
}

module.exports.getApiUrl = function(key) {
    var json = this.getJsonToString('config/config.json');   
    return json.api.url[key];
}