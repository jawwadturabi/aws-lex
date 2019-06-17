'use strict';
var admin = require("firebase-admin");
var serviceAccount = require("./agent-e2634-firebase-adminsdk-g23y7-17d2ddddb2.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
exports.handler = async (event, context, callback) => {
    try {
        console.log(`request received for userId=${event.userId}, intentName=${event.currentIntent.name}`);
        var slots = event.currentIntent.slots;
        var noOfPeople = slots.noOfPeople;
        var noOfRoom = slots.noOfRoom;
        var roomKind = slots.roomKind;
        var subject = slots.subject;
        var name = slots.name;
        var email = slots.email;
        switch (event.currentIntent.name) {
            case 'Hotel_Booking':
                console.log('we are in hotel')
                // var info = {
                //     'name': "name",
                //     'email': "email",
                //     'content': `Okay,  I have book   rooms for  people in  category`
                // };
                  db.collection('userInfolex').add({"":""})
                    .then((data) => {
                        console.log(".then is here", data)
                        context.succeed({
                            "dialogAction": {
                                "type": "Close",
                                "fulfillmentState": "Fulfilled",
                                "message": {
                                    'contentType': 'PlainText',
                                    'content': `Okay, ${name} I have book  ${noOfRoom} rooms for ${noOfPeople} people in ${roomKind} category`
                                }
                            }
                        })
                    })
                    .catch((err) => {
                        console.log('Error getting documents', err);
                    })
                context.succeed({
                    "dialogAction": {
                        "type": "Close",
                        "fulfillmentState": "Fulfilled",
                        "message": {
                            'contentType': 'PlainText',
                            'content': `Okay, ${name} I have book  ${noOfRoom} rooms for ${noOfPeople} people in ${roomKind} category`
                        }
                    }
                })
                break

            case 'Cancelling':
                context.succeed({
                    "dialogAction": {
                        "type": "Close",
                        "fulfillmentState": "Fulfilled",
                        "message": {
                            'contentType': 'PlainText',
                            'content': `Your Booking has been cancelled, Would you like to make another booking?`
                        }
                    }
                });
                break

            case 'help':
                context.succeed({
                    "dialogAction": {
                        "type": "Close",
                        "fulfillmentState": "Fulfilled",
                        "message": {
                            'contentType': 'PlainText',
                            'content': `Please specify that you want to give suggestion or complain?`
                        }
                    }
                });
                break

            case 'Complaint':
                context.succeed({
                    "dialogAction": {
                        "type": "Close",
                        "fulfillmentState": "Fulfilled",
                        "message": {
                            'contentType': 'PlainText',
                            'content': `Thanks for using our services! Your complain for ${subject} is forwarded to concerned department`
                        }
                    }
                })
                break

            default:
                context.succeed({
                    "dialogAction": {
                        "type": "Close",
                        "fulfillmentState": "Fulfilled",
                        "message": {
                            'contentType': 'PlainText',
                            'content': `Can't understand`
                        }
                    }
                })
        }
    }
    catch (err) {
        context.succeed(err);
    }
};