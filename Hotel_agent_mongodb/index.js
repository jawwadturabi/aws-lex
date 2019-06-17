'use strict';
// const mongoose = require("mongoose ")

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks for using our services.")


// --------------- Events -----------------------
exports.handler = (event, context,callback) => {

    try {
        console.log(`request received for userId=${event.userId}, intentName=${event.currentIntent.name}`);
        // const sessionAttributes = intentRequest.sessionAttributes;
        const slots = event.currentIntent.slots;
        const noOfPeople = slots.noOfPeople;
        const noOfRoom = slots.noOfRoom;
        const roomKind = slots.roomKind;
        const subject = slots.subject;


        switch (event.currentIntent.name) {
            case 'Hotel_Booking':
                {
                    context.succeed({
                        "dialogAction": {
                            "type": "Close",
                            "fulfillmentState": "Fulfilled",
                            "message": {
                                'contentType': 'PlainText',
                                'content': `Okay, I have book  ${noOfRoom} rooms for ${noOfPeople} people in ${roomKind} category`

                            }
                        }
                    })
                    console.log("this intent is triggered");
                    break
                }

            case 'Cancelling':
                {
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
                }
            case 'help':
                {
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
                }

            case 'Complaint':
                {
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
                }
            default:
                {
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
    }
    catch (err) {
        context.succeed(err);
    }
};
