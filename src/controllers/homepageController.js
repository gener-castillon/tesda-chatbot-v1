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

    let response;

    if (received_message && received_message.quick_reply && received_message.quick_reply.payload) {
        let payload = received_message.quick_reply.payload;
        if (payload === "TALK_AGENT") {
            await chatbotService.requestTalkToAgent(sender_psid);
        } else if (payload === 'LOCATION') {
            await chatbotService.requestLocation(sender_psid);
        } else if (payload === 'c1') {
            templateMessage.courseIndex = 0;
            await chatbotService.selectedCourse(sender_psid, "1. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c2') {
            templateMessage.courseIndex = 1;
            await chatbotService.selectedCourse(sender_psid, "2. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c3') {
            templateMessage.courseIndex = 2;
            await chatbotService.selectedCourse(sender_psid, "3. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c4') {
            templateMessage.courseIndex = 3;
            await chatbotService.selectedCourse(sender_psid, "4. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c5') {
            templateMessage.courseIndex = 4;
            await chatbotService.selectedCourse(sender_psid, "5. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c6') {
            templateMessage.courseIndex = 5;
            await chatbotService.selectedCourse(sender_psid, "6. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c7') {
            templateMessage.courseIndex = 6;
            await chatbotService.selectedCourse(sender_psid, "7. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c8') {
            templateMessage.courseIndex = 7;
            await chatbotService.selectedCourse(sender_psid, "8. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c9') {
            templateMessage.courseIndex = 8;
            await chatbotService.selectedCourse(sender_psid, "9. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c10') {
            templateMessage.courseIndex = 9;
            await chatbotService.selectedCourse(sender_psid, "10. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c11') {
            templateMessage.courseIndex = 10;
            await chatbotService.selectedCourse(sender_psid, "11. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'c12') {
            templateMessage.courseIndex = 11;
            await chatbotService.selectedCourse(sender_psid, "12. " + templateMessage.programs[templateMessage.courseIndex]);
        } else if (payload === 'NEW_STUDENT') {
            await chatbotService.setNewStudent(sender_psid);
        }
    }

    // Sends the response message
    await chatbotService.sendMessage(sender_psid, response);
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
            await chatbotService.setTrainingOrAssessment(sender_psid);
            break;

        case 'ASSESSMENT':
            await chatbotService.setTrainingOrAssessment(sender_psid);
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