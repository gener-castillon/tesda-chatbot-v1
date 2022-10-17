let courseIndex = 0;

let programs = [
    "Assembly of Solar Nightlight and Post Lamp",
    "Bartending NC II",
    "Bookkeeping NC III",
    "Bread and Pastry Production NC II",
    "Computer Systems Servicing NC II",
    "Cookery NC II",
    "Driving NC II",
    "Electronic Products Assembly and Servicing NC II",
    "Events Management Services NC III",
    "Food and Beverage Services NC II",
    "Front Office Services NC II",
    "Housekeeping NC II",
    "Real Estate Services NC II",
    "Trainers Methodology Level I",
    "Visual Graphic Design NC III"
];

let progDetails = [
    
];

let menuMessage = () => {
    return {
        "text": "How can we you help you today?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "New Student?",
                "payload": "NEW_STUDENT"
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
        "text": "Select your Preferred Course:",
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
            }, {
                "content_type": "text",
                "title": "11",
                "payload": "c11"
            }, {
                "content_type": "text",
                "title": "12",
                "payload": "c12"
            }
        ]
    };
};

let location = () => {
    return {
        "text": "We are located at KM 30 NATIONAL ROAD, TUNASAN, MUNTINLUPA CITY beside St. Peregrine Church.\n\nFor more direction and location details, please follow this link: https://goo.gl/maps/VbVMaYxXr3k4id6x6"
    };
};

let newStudent = () => {
    return {
        "text": "Yes, we are accepting new student interested in short program and vocational courses."
    };
};

module.exports = {
    menuMessage: menuMessage,
    location: location,
    course: course,
    newStudent: newStudent,
    courseIndex: courseIndex,
    programs: programs
};