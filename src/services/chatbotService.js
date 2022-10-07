require("dotenv").config();
import request from "request";
import homepageService from "./homepageService";
import templateMessage from "./templateMessage";

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
                "text": "Hi " + name + "! Thanks for contacting us. We are TESDA registered Training and Assessment Center for the following programs: \n\n" + str
            };

            let response3 = templateMessage.course();

            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

// Request Talk To Agent Message
let requestTalkToAgent = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {

        } catch (e) {
            reject(e);
        }
    });
};

// Request Location
let requestLocation = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.location();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

// Selected Course
let selectedCourse = (sender_psid, course = "") => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": course,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "How to apply?",
                                "payload": "APPLY"
                            }
                        ]
                    }
                }
            };
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

// Ask Question, Training or Assessment
let askQuestion = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Is this for ",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Training?",
                                "payload": "TRAINING"
                            }, {
                                "type": "postback",
                                "title": "Assessment?",
                                "payload": "ASSESSMENT"
                            }
                        ]
                    }
                }
            };
            await sendMessage(sender_psid);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

// Set Application Info By Webview
let setApplicationInfoByWebview = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

// Backt to Main Menu
let mainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.menuMessage();
            await sendMessage(sender_psid, response);
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
                    await homepageService.sendTypingOff(sender_psid);
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
    sendWelcomeMessage: sendWelcomeMessage,
    requestTalkToAgent: requestTalkToAgent,
    setApplicationInfoByWebview: setApplicationInfoByWebview,
    mainMenu: mainMenu,
    requestLocation: requestLocation,
    selectedCourse: selectedCourse,
    askQuestion: askQuestion
}