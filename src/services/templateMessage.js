
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

let course = () => {
    return {
        "text": "Preferred Course:",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "1",
                "payload": "c1"
            }, {
                "content_type": "text",
                "title": "2",
                "payload": "c2"
            }, {
                "content_type": "text",
                "title": "3",
                "payload": "c3"
            }, {
                "content_type": "text",
                "title": "4",
                "payload": "c4"
            }, {
                "content_type": "text",
                "title": "5",
                "payload": "c5"
            }, {
                "content_type": "text",
                "title": "6",
                "payload": "c6"
            }, {
                "content_type": "text",
                "title": "7",
                "payload": "c7"
            }, {
                "content_type": "text",
                "title": "8",
                "payload": "c8"
            }, {
                "content_type": "text",
                "title": "9",
                "payload": "c9"
            }, {
                "content_type": "text",
                "title": "10",
                "payload": "c10"
            }
        ]
    };
};

let location = () => {
    return {
        "text": "We are located at KM 30 National Road, Tunasan, Muntinlupa City.\n\nFor more details, follow this link: https://goo.gl/maps/VbVMaYxXr3k4id6x6"
    };
};

module.exports = {
    menuMessage: menuMessage,
    location: location,
    course: course
};