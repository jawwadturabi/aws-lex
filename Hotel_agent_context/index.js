'use strict';
var mongoose = require('mongoose');
var dbURI = "mongodb+srv://author:author123@cluster0-geoiq.mongodb.net/test?retryWrites=true";
mongoose.connect(dbURI, { useNewUrlParser: true })
    .catch((e) => {
        console.log("catch error: ", e)
    })
mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
})
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
})

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});
console.log("reach here")
var userSchema = new mongoose.Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true },
    "Detail": { type: String, required: true }
},
    {
        collection: "user1"
    });
var userModel = mongoose.model("user12", userSchema);
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
                var newUser = new userModel({
                    "name": name,
                    "email": email,
                    'Detail': `You have booked ${noOfRoom} rooms for ${noOfPeople} people in ${roomKind} category`
                })
                await newUser.save().then(d => {
                    console.log("data is saved", d)
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

                }).catch(err => {
                    console.log("error is : ", err)
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


