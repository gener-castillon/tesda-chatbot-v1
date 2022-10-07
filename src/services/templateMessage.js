
let menuMessage = () => {
    return {
        "text": "How can we you help you today?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Apply",
                "payload": "APPLY"
            }, {
                "content_type": "text",
                "title": "Location",
                "payload": "LOCATION"
            }, {
                "content_type": "text",
                "title": "Talk to agent",
                "payload": "TALK_AGENT"
            }
        ]
    };
};

let location = () => {
    return {
        "text":"https://goo.gl/maps/VbVMaYxXr3k4id6x6"
    };
};

module.exports = {
    menuMessage: menuMessage,
    location: location
};