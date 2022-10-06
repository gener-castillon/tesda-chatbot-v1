require("dotenv").config();
import request from "request";
import homepageService from "./homepageService";

const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;

// Send Welcome Message
let sendWelcomeMessage = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let name = await homepageService.getFacebookUsername(sender_psid);
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://acegif.com/wp-content/uploads/2021/4fh5wi/welcome-15.gif"
                    }
                }
            };

            let programs = [
                "1. Assembly of Solar Nightlight and Post Lamp",
                "2. Bookkeeping NC III",
                "3. Bread and Pastry Production NC II",
                "4. Caregiving NC II",
                "5. Computer Systems Servicing NC II",
                "6. Cookery NC II",
                "7. Driving NC II",
                "8. Electronic Products Assembly and Servicing NC II",
                "9. Food and Beverage Services NC II",
                "10. Housekeeping NC II",
                "11. Trainers Methodology Level 1",
                "12. Visual Graphic Design NC III"
            ];

            let str = "";

            for (let i = 0; i < programs.length; i++) {
                str += programs[i] + "\n";
            }

            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Hi " + name + "! Thanks for contacting us. We are TESDA registered Training and Assessment Center for the following programs: \n\n" + str,
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": process.env.WEBVIEW_URL,
                                "title": "Apply",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
                            }
                        ]
                    }
                }
            };

            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

// Send Message
let sendMessage = (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            await homepageService.markMessageRead(sender_psid);
            await homepageService.sendTypingOn(sender_psid);
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            }

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": pageAccessToken },
                "method": "POST",
                "json": request_body
            }, async (err, res, body) => {
                if (!err) {
                    resolve('message sent!');
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {

        }
    });
};

module.exports = {
    sendMessage: sendMessage,
    sendWelcomeMessage: sendWelcomeMessage
}