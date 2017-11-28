var rest = require('../API/Restclient');
var builder = require('botbuilder');


//Calls 'getCurrencyData' in RestClient.js with 'displayCurrencyCards' as callback to get all the currency information
exports.displayCurrencyCards = function getCurrencyData(session){
    var url ='https://api.fixer.io/latest';
    rest.getCurrencyData(url, session, displayCurrencyCards);
}


function displayCurrencyCards(message, session) {
    var attachment = [];
    var currencies = JSON.parse(message);

    // //For each currency, print the country and rate
    for (var index in currencies.rates) {
         var name = String(currencies.rates[index]);
         attachment = attachment + "Country: " + index + " " + "Rate: " + name + "\n"  ;
    }

          session.send(attachment);
 }



// // Calls 'getNutritionData' in RestClient.js with 'getFoodNutrition' as callback to get ndbno of food
// exports.displayCurrencyCards = function getCurrencyData(CurrencyName, session){
//     var url ='https://api.fixer.io/latest,';

//     rest.getCurrencyData(url, session,CurrencyName, getCurrency);
// }