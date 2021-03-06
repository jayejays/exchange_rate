var request = require('request');
//API below


exports.getCurrencyData = function getData(url,session,callback){

    request.get(url,function(err,res,body){
        if(err){
            console.log(err);
        }else {
        	//console.log(body);
            callback(body,session);
        }
    });
};

//azure tables request below
var request = require('request')
exports.getFavouriteCurrency = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username);
        }
    });
};

//delete favourite food in azure tables
exports.deleteFavouriteCurrency = function deleteData(url,session, username ,favouriteCurrency, id, callback){
    var options = {
        url: url + "\\" + id,
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        }
    };

    request(options,function (err, res, body){
        if( !err && res.statusCode === 200){
            console.log(body);
            callback(body,session,username, favouriteCurrency);
        }else {
            console.log(err);
            console.log(res);
        }
    })

};

exports.postFavouriteCurrency = function getData(url, username, favouriteCurrency){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "username" : username,
            "favouriteCurrency" : favouriteCurrency
        }
      };
      
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};