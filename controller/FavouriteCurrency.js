var rest = require('../API/Restclient');

exports.displayFavouriteCurrency = function getFavouriteCurrency(session, username){
    var url = 'https://currencyratebot.azurewebsites.net/tables/easycurrencybot';
    rest.getFavouriteCurrency(url, session, username, handleFavouriteCurrencyResponse)
};

function handleFavouriteCurrencyResponse(message, session, username) {
    var favouriteCurrencyResponse = JSON.parse(message);
    var allCurrencies = [];
    for (var index in favouriteCurrencyResponse) {
        var usernameReceived = favouriteCurrencyResponse[index].username;
        var favouriteCurrency = favouriteCurrencyResponse[index].favouriteCurrency;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite currencies unless last one
            if(favouriteCurrencyResponse.length - 1) {
                allCurrencies.push(favouriteCurrency);
            }
            else {
                allCurrencies.push(favouriteCurrency + ', ');
            }
        }        
    }
    
    // Print all favourite currencies for the user that is currently logged in
    session.send("%s, your favourite currencies are: %s", username, allCurrencies);                
    
}

exports.deleteFavouriteCurrency = function deleteFavouriteCurrency(session,username,favouriteCurrency){
    var url = 'https://currencyratebot.azurewebsites.net/tables/easycurrencybot';


    rest.getFavouriteCurrency(url,session, username,function(message,session,username){
     var   allCurrencies = JSON.parse(message);

        for(var i in allCurrencies) {

            if (allCurrencies[i].favouriteCurrency === favouriteCurrency && allCurrencies[i].username === username) {

                console.log(allCurrencies[i]);

                rest.deleteFavouriteCurrency(url,session,username,favouriteCurrency, allCurrencies[i].id ,handleDeletedCurrencyResponse)

            }
        }


    });


};