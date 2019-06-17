'use strict';
var Firebase = require('firebase');

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks for using our services.")
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

// --------------- Events -----------------------

function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const noOfPeople = slots.noOfPeople;
    const noOfRoom = slots.noOfRoom;
    const roomKind = slots.roomKind;
    const subject = slots.subject;
    

    switch (intentRequest.currentIntent.name) {
        case 'Hotel_Booking':
            {  
                callback(close(sessionAttributes, 'Fulfilled', {
                    'contentType': 'PlainText',
                    'content': `Okay, I have book  ${noOfRoom} rooms for ${noOfPeople} people in ${roomKind} category`
                    
                }))
                console.log("this intent is triggered");
                break
            }

        case 'Cancelling':
            {
                callback(close(sessionAttributes, 'Fulfilled', {
                    'contentType': 'PlainText',
                    'content': `Okay, I have cancelled your book`,
                    'content': `Your Booking has been cancelled, Would you like to make another booking?`
                }));
                break
            }
        case 'help':
            {
                callback(close(sessionAttributes, 'Fulfilled', {
                    'contentType': 'PlainText',
                    'content': `What kind of help do you required either you want to give suggestion or complain?`,
                    'content': `Please specify that you want to give suggestion or complain?`
                }));
                break
            }

        case 'Complaint':
            {
                callback(close(sessionAttributes, 'Fulfilled', {
                    'contentType': 'PlainText',
                    'content': `Thanks for using our services! Your complain for ${subject} is forwarded to concerned department`
                }));
                break
            }
        default:
            {
                callback(close(sessionAttributes, 'Fulfilled', {
                    'contentType': 'PlainText',
                    'content': `Can't understand`
                }));
            }

    }
}
// --------------- Main handler -----------------------

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
