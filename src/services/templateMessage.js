let courseIndex = 0;

let programs = [
    "Assembly of Solar Nightlight and Post Lamp", //0
    "Bartending NC II", // 1
    "Bookkeeping NC III", // 2
    "Bread and Pastry Production NC II", // 3
    "Computer Systems Servicing NC II", // 4
    "Cookery NC II", // 5
    "Driving NC II", // 6
    "Electronic Products Assembly and Servicing NC II", // 7
    "Events Management Services NC III", // 8
    "Food and Beverage Services NC II", // 9
    "Front Office Services NC II", // 10
    "Housekeeping NC II", // 11
    "Real Estate Services NC II", // 12
    "Trainers Methodology Level I", // 13
    "Visual Graphic Design NC III" // 14
];

let progDetails = [
    programs[0].toUpperCase() + " \n "
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
        "text": "Type the number of your preferred course:"
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
    programs: programs,
    progDetails: progDetails
};