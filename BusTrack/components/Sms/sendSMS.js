/*import Twilio from 'twilio';

const accountSid = "AC4db63a134931c172c24d0ed88a86704b";
const authToken = "1673181c12e58465d6c0170c76c8759e";
const twilioPhoneNumber = "+12513195271";
const toNumber = "+919043720850";

const client = Twilio(accountSid, authToken);

const sendSMS = async (body, to) => {
    let msgOptions = {
        from: twilioPhoneNumber,
        to: toNumber,
        body: body
    };
    try {
        const message = await client.messages.create(msgOptions);
        console.log(message);
    } catch (error) {
        console.error(error);
    }
};

export { sendSMS }; // Export the sendSMS function
*/
