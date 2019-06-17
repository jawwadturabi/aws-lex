'use strict';
var request = require('request');
var apiKey = '4970e4f266675063af77ad454f45ebd6';
// var sessionAttributes = event.sessionAttributes || {};
const admin = require('firebase-admin');

var serviceAccount = require('./agent-e2634-6645a6d354b1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

switch (event.requestIntent.currentIntent.name) {

    case 'temperature':
        temperature(event, context)
        break;
    default:
        console.log("default triggered");
        fullfill(context, "no intent matched with:  ")
}



exports.temperature = (event, context) => {
    try {
        // firestore.collection('orders').add(params)
        // .then(() => {
        var slots = event.currentIntent.slots;
        var cityName = event.currentIntent.slots.city;
        var url = `api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
        console.log(`request received for userId=${event.userId}, intentName=${event.currentIntent.name}`);

        request(url, function (err, response, body) {
            if (err) {
                console.log('error:', error);
            } else {
                firestore.collection('orders').add(params)
                .then(() => {
                let message = `It's ${weather.wind.speed}m/s and ${weather.main.humidity}% humidity in ${cityName} !`;
                console.log(message);
                if (slots.rain === null && slots.city !== null) {
                    context.succeed(
                        {
                            "sessionAttributes": {
                                "city": cityName
                            },
                            "dialogAction": {
                                "type": "close",
                                "fulfillmentState": "Fulfilled",
                                "message": {
                                    "contentType": "PlainText",
                                    "content": message
                                },
                                // "intentName": "temperature",
                                // "slots": {
                                // "rain": 'rain'
                                // },
                                // "slotToElicit": 'city',
                                "responseCard": {
                                    "version": 1,
                                    "contentType": "application/vnd.amazonaws.card.generic",
                                    "genericAttachments": [
                                        {
                                            "title": "Weather-Update",
                                            "subTitle": "temperature",
                                            "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Purple71/v4/56/6c/10/566c1052-e56e-79b7-107c-4e97fa2f94a6/source/512x512bb.jpg",
                                            "attachmentLinkUrl": "https://is1-ssl.mzstatic.com/image/thumb/Purple71/v4/56/6c/10/566c1052-e56e-79b7-107c-4e97fa2f94a6/source/512x512bb.jpg",
                                        }]
                                }

                            },
                        })
                }})
            }
        })
        .catch((e => {

            console.log("error: ", e);

            response.send({
                speech: "something went wrong when writing on database"
            });
        }))
    }




    catch (err) {
        callback(err);
    }
};