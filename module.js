var request = require('request');


module.exports = function(url, callback) {
  var website = url
  var result;
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      
      result = body;
    }
    callback(null, result);
  })  
}