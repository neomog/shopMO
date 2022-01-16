const Vonage = require('@vonage/server-sdk')
const dotenv = require('dotenv');


dotenv.config({ path: 'backend/config/config.env'});

const sendSms = () =>{

  const vonage = new Vonage({
  
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET 
})

const from = "shopMO";
const to = "26656301591"
const text = 'Hey your parcel is being delivered please prepare for pickup. please go to this link to view your orders>>> http://shop-mo.herokuapp.com/orders/me This is just a shopmo intergration test for sms system'

vonage.message.sendSms( 
    from,
    to,
    text,
    (err, res) => {
        console.log(res.messages[0])
        if (err) {
            console.log(err)
        }else {
            if (res.messages[0]
                ['status'] === "0"){
                    console.log(`Message faild with error:
                    ${res.messages[0]
                        ['error-text']}`)
                } 
        }
    }
)}

module.exports = sendSms;

// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// // require the Twilio module and create a REST client
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//     to: '+15558675310',
//     from: '+15017122661',
//     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//   })
//   .then(message => console.log(message.sid));