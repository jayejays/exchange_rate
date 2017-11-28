var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/2e851cdd-2716-4989-bfbd-65475b00ce01/url?iterationId=3d9bc0c9-6b76-4d70-b48a-18f815688dfc',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'ce5fd674a76843fbadde6a1694ebef61'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}