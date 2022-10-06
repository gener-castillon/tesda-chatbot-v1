import request from "request";

const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;

let handleSetupProfileAPI = () => {
    return new Promise((resolve, reject) => {
        try {
            let url = 'https://graph.facebook.com/v15.0/me/messenger_profile?access_token=' + pageAccessToken;
            let request_body = {
                "get_started": {
                    "payload": "GET_STARTED"
                },
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "postback",
                                "title": "Talk to an Agent",
                                "payload": "TALK_AGENT"
                            },
                            {
                                "type": "postback",
                                "title": "Restart this conversation",
                                "payload": "RESTART_CONVERSATION"
                            },
                            {
                                "type": "web_url",
                                "title": "View Facebook Page",
                                "url": "https://www.facebook.com/profile.php?id=100083313312165",
                                "webview_height_ratio": "full"
                            }
                        ]
                    }
                ],
                "whitelisted_domains": [
                    "https://tesda-chatbot-v1.herokuapp.com/"
                ]
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": url,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve("done");
                } else {
                    reject("Unable to send message: " + err);
                }
            });
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let url = 'https://graph.facebook.com/' + sender_psid + '?fields=first_name,last_name,profile_pic&access_token=' + pageAccessToken;
            // Send the HTTP request to the Messenger Platform
            request({
                "uri": url,
                "method": "GET"
            }, (err, res, body) => {
                if (!err) {
                    body = JSON.parse(body);
                    let name = body.first_name + " " + body.last_name;
                    resolve(name);
                } else {
                    reject("Unable to send message: " + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendTypingOn = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let url = 'https://graph.facebook.com/v6.0/me/messages?access_token='+pageAccessToken;
            let request_body = {
                "recipient":{
                    "id": sender_psid
                  },
                  "sender_action":"typing_on"
            };
            request({
                "uri": url,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve("dpne");
                } else {
                    reject("Unable to send message: " + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendTypingOff = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let url = 'https://graph.facebook.com/v6.0/me/messages?access_token='+pageAccessToken;
            let request_body = {
                "recipient":{
                    "id": sender_psid
                  },
                  "sender_action":"typing_off"
            };
            request({
                "uri": url,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve("dpne");
                } else {
                    reject("Unable to send message: " + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let markMessageRead = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let url = 'https://graph.facebook.com/v6.0/me/messages?access_token='+pageAccessToken;
            let request_body = {
                "recipient":{
                    "id": sender_psid
                  },
                  "sender_action":"mark_seen"
            };
            request({
                "uri": url,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve("dpne");
                } else {
                    reject("Unable to send message: " + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleSetupProfileAPI: handleSetupProfileAPI,
    getFacebookUsername: getFacebookUsername,
    sendTypingOn: sendTypingOn,
    sendTypingOff: sendTypingOff,
    markMessageRead: markMessageRead
}