require("dotenv").config();
import homepageService from "../services/homepageService";
import chatbotService from "../services/chatbotService";
import templateMessage from "../services/templateMessage";

const verifyToken = process.env.VERIFY_TOKEN;
const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;

let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getWebhook = (req, res) => {
    let _verifyToken = verifyToken;

    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === _verifyToken) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

let postWebhook = (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        body.entry.forEach(function (entry) {
            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

};

// Handles messages events
let handleMessage = async (sender_psid, received_message) => {
    if (received_message && received_message.quick_reply && received_message.quick_reply.payload) {
        let payload = received_message.quick_reply.payload;
        if (payload === "TALK_AGENT") {
            await chatbotService.requestTalkToAgent(sender_psid);
        } else if (payload === 'LOCATION') {
            await chatbotService.requestLocation(sender_psid);
        } else if (payload === 'NEW_STUDENT') {
            await chatbotService.setNewStudent(sender_psid);
        }
    } else if (received_message.text) {
        let str = received_message.text;
        if (str == "1") {
            templateMessage.courseIndex = 0;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "2") {
            templateMessage.courseIndex = 1;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "3") {
            templateMessage.courseIndex = 2;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "4") {
            templateMessage.courseIndex = 3;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "5") {
            templateMessage.courseIndex = 4;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "6") {
            templateMessage.courseIndex = 5;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "7") {
            templateMessage.courseIndex = 6;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "8") {
            templateMessage.courseIndex = 7;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "9") {
            templateMessage.courseIndex = 8;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "10") {
            templateMessage.courseIndex = 9;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "11") {
            templateMessage.courseIndex = 10;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "12") {
            templateMessage.courseIndex = 11;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "13") {
            templateMessage.courseIndex = 12;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "14") {
            templateMessage.courseIndex = 13;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else if (str == "15") {
            templateMessage.courseIndex = 14;
            let str = templateMessage.programs[templateMessage.courseIndex].split("+");
            await chatbotService.selectedCourse(sender_psid, str);
        } else {
            await chatbotService.errorMessage(sender_psid);
        }
    }
}

// Handles messaging_postbacks events
let handlePostback = async (sender_psid, received_postback) => {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    switch (payload) {
        case 'GET_STARTED':
            await chatbotService.sendWelcomeMessage(sender_psid);
            break;

        case 'MAIN_MENU':
            await chatbotService.mainMenu(sender_psid);
            break;

        case 'RESTART_CONVERSATION':
            await chatbotService.sendWelcomeMessage(sender_psid);
            break;

        case 'APPLY':
            await chatbotService.askQuestion(sender_psid);
            break;

        case 'TRAINING':
            await chatbotService.setTrainingDetails(sender_psid);
            break;

        case 'ASSESSMENT':
            await chatbotService.setAssessmentsDetails(sender_psid);
            break;

        default:
            console.log("Run default switch case.");
            break;
    }

    // Send the message to acknowledge the postback
    await chatbotService.sendMessage(sender_psid, response);
}

let handleSetupProfile = async (req, res) => {
    try {
        await homepageService.handleSetupProfileAPI();
        return res.redirect("/");
    } catch (e) {
        console.log(e);
    }
};

let getSetupProfilePage = (req, res) => {
    return res.render("profile.ejs");
};

let getApplicationPage = (req, res) => {
    let appId = process.env.FACEBOOK_APP_ID;
    return res.render("application.ejs", {
        appId: appId
    });
};

let setApplicationInfo = (req, res) => {
    return res.status(200).json({
        message: "ok!"
    });
};

module.exports = {
    getHomepage: getHomepage,
    getWebhook: getWebhook,
    postWebhook: postWebhook,
    handleSetupProfile: handleSetupProfile,
    getSetupProfilePage: getSetupProfilePage,
    getApplicationPage: getApplicationPage,
    setApplicationInfo: setApplicationInfo
};