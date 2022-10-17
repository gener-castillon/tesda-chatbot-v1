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

            let str1 = "";

            for (let i = 0; i < templateMessage.programs.length; i++) {
                str1 += (i + 1) + ". " + templateMessage.programs[i] + "\n";
            }


            let response2 = {
                "text": "Hi " + name + "! Thanks for contacting us. We are TESDA registered Training and Assessment Center for the following programs: \n\n" + str1
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
            let response;

            if (course.includes(templateMessage.programs[0])) {
                response = {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "\"" + course.toUpperCase() + "\" course selected. This course is for training only.",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Apply Now",
                                    "payload": "APPLY"
                                }
                            ]
                        }
                    }
                };
            } else if (course.includes(templateMessage.programs[8]) || course.includes(templateMessage.programs[12]) || course.includes(templateMessage.programs[10])) {
                response = {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "\"" + course.toUpperCase() + "\" course selected. This course is for assessment only.",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Apply Now",
                                    "payload": "APPLY"
                                }
                            ]
                        }
                    }
                };
            } else {
                response = {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "\"" + course.toUpperCase() + "\" course selected. This course is available for Training and Assessment. Is this for",
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
            }

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
                
            };
            await sendMessage(sender_psid, response);
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

let setTrainingOrAssessment = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let setNewStudent = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.newStudent();
            await sendMessage(sender_psid, response);
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
    askQuestion: askQuestion,
    setTrainingOrAssessment: setTrainingOrAssessment,
    setNewStudent: setNewStudent
}