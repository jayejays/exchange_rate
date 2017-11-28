var rest = require('../API/Restclient');
var builder = require('botbuilder');

// //Calls 'getYelpData' in RestClient.js with 'displayCurrencyCards' as callback to get list of restaurant information
// exports.displayCurrencyCards = function getCurrencyData(CurrencyName, session){
//     var url ='https://api.fixer.io/latest,';
//     rest.getCurrencyData(url,session,displayCurrencyCards);
// }

// function displayCurrencyCards(message, session) {
//     var attachment = [];
//     var currencyCard = JSON.parse(message);
//     console.log(message);
//     //For each restaurant, add herocard with name, address, image and url in attachment
//     for (var index in currencyCard.base) {
//         var currency = currencyCard.base[index];
//         var name = currency.rates;


//         var card = new builder.HeroCard(session)
//             .title(name)
//         attachment.push(card);

//     }

//     //Displays currency hero card carousel in chat box 
//     var message = new builder.Message(session)
//         .attachmentLayout(builder.AttachmentLayout.carousel)
//         .attachments(attachment);
//     session.send(message);
// }

// var rest = require('../API/Restclient');
// var builder = require('botbuilder');

// //Calls 'getNutritionData' in RestClient.js with 'getFoodNutrition' as callback to get ndbno of food
// exports.displayCurrencyCards = function getCurrencyData(CurrencyName, session){
//     var url ='https://api.fixer.io/latest,';

//     rest.getCurrencyData(url, session,CurrencyName, getCurrency);
// }


// //Parses JSON to get the ndbno. Calls 'getNutritionData' in RestClient.js with 'displayNutritionCards' as callback to get nutrition information
// function getCurrency(message, CurrencyName, session){
//     var CurrencyList = JSON.parse(message);
//  	console.log(message);
//     var url ='https://api.fixer.io/latest,';
    
//     rest.getCurrencyData(url, session, CurrencyName, displayCurrencyCards);

// }

// function displayCurrencyCards(message, CurrencyName,session){
//     //Parses JSON
//     var currency_parse = JSON.parse(message);
//     console.log(message);

//     //Displays nutrition adaptive cards in chat box 
//     session.send(new builder.Message(session).addAttachment({
//         contentType: "application/vnd.microsoft.card.adaptive",
//         content: {
//             "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
//             "type": "AdaptiveCard",
//             "version": "0.5",
//             "body": [
//                 {
//                     "type": "Container",
//                     "items": [
//                         {
//                             "type": "TextBlock",
//                             "text": CurrencyName.charAt(0).toUpperCase() + CurrencyName.slice(1),
//                             "size": "large"
//                         },
//                         {
//                             "type": "TextBlock",
//                             "text": "Nutritional Information"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "Container",
//                     "spacing": "none",
//                     "items": [
//                         {
//                             "type": "ColumnSet",
//                             "columns": [
//                                 {
//                                     "type": "Column",
//                                     "width": "auto",
//                                     "items": [
//                                         {
//                                             "type": "FactSet",
//                                             "facts": ""
//                                         }
//                                     ]
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }
//     }));
// }

// var oxr = require('open-exchange-rates');
// oxr.set({ app_id: 'f06f36d2d5c54b32912cf2c188e49375' })

// oxr.latest(function() {
// 	// You can now use oxr.rates, oxr.base and oxr.timestamp
// 	var x = oxr.rates;
// 	console.log(x);
// });

// Calls 'getNutritionData' in RestClient.js with 'getFoodNutrition' as callback to get ndbno of food
exports.displayCurrencyCards = function getCurrencyData(CurrencyName, session){
    var url ='https://api.fixer.io/latest,';

    rest.getCurrencyData(url, session,CurrencyName, getCurrency);
}