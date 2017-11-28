var builder = require('botbuilder');
var currency = require('./CurrencyCard')
var favouriteCurrency = require('./FavouriteCurrency');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/634e94f3-8c79-42fd-93f4-3c70703969f4?subscription-key=62b9e042dc28480986494021f69f1c2f&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetExchange', function (session, args) {
        if (!isAttachment(session)) {

            // Pulls out the currency entity from the session if it exists
            var CurrencyEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Currency');

            // Checks if the for entity was found
            if (CurrencyEntity) {
                session.send('Calculating exchange rate in %s...', CurrencyEntity.entity);
               // Here you would call a function to get the exchange rate information

            } else {
                session.send("No exchange rate identified! Please try again");
            }
        }
    }).triggerAction({
        matches: 'GetExchange'
    });

//other bot dialogs in here

    bot.dialog('DeleteFavourite', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results,next) {
        if (!isAttachment(session)) {

            session.send("You want to delete one of your favourite currencies.");

            // Pulls out the food entity from the session if it exists
            var CurrencyEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'Currency');

            // Checks if the for entity was found
            if (CurrencyEntity) {
                session.send('Deleting \'%s\'...', CurrencyEntity.entity);
                favouriteCurrency.deleteFavouriteCurrency(session,session.conversationData['username'],CurrencyEntity.entity); //<--- CALLL WE WANT
            } else {
                session.send("No currency identified! Please try again");
            }
        }

    }
    ]).triggerAction({
        matches: 'DeleteFavourite'

    });

   bot.dialog('GetFavouriteCurrency', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your favourite currencies");
                favouriteCurrency.displayFavouriteCurrency(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            }
        }
    ]).triggerAction({
        matches: 'GetFavouriteCurrency'
    });

   bot.dialog('WantCurrency', function (session, args) {
        if (!isAttachment(session)) {
            // Pulls out the currency entity from the session if it exists
            var CurrencyEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Currency');

            // Checks if the currency entity was found
            if (CurrencyEntity) {
                session.send('Looking for the exchange rates of the country %s...', CurrencyEntity.entity);
                // Insert logic here later
                //currency.displayCurrencyCards(CurrencyEntity.entity, session);
            } else {
                session.send("No currency identified! Please try again");
            }
        }

    }).triggerAction({
        matches: 'WantCurrency'
    });

   bot.dialog('WelcomeIntent', function (session, args) {
        session.send("Welcome to this chat");
    }).triggerAction({
        matches: 'WelcomeIntent'
    });

}

// Function is called when the user inputs an attachment
function isAttachment(session) { 
    var msg = session.message.text;
    if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
        
        //call custom vision here later
        return true;
    }
    else {
        return false;
    }
}