let courseIndex = 0;

let programs = [
    "Bartending NC II+ta", // 0
    "Bookkeeping NC III+ta", // 1
    "Bread and Pastry Production NC II+ta", // 2
    "Computer Systems Servicing NC II+ta", // 3
    "Cookery NC II+ta", // 4
    "Driving NC II+ta", // 5
    "Electronic Products Assembly and Servicing NC II+ta", // 6
    "Food and Beverage Services NC II+ta", // 7
    "Housekeeping NC II+ta", // 8
    "Trainers Methodology Level I+ta", // 9
    "Visual Graphic Design NC III+ta", // 10
    "Assembly of Solar Nightlight and Post Lamp+t", //11
    "Events Management Services NC III+a", // 12
    "Front Office Services NC II+a", // 13
    "Real Estate Services NC II+a", // 14
];

let trainingHours = [
    "438 hrs", // 0
    "292 hrs", // 1
    "196 hrs", // 2
    "280 hrs", // 3
    "316 hrs", // 4
    "118 hrs", // 5
    "260 hrs", // 6
    "365 hrs", // 7
    "436 hrs", // 8
    "264 hrs", // 9
    "501 hrs", // 10
    "64 hrs", // 11
    "", // 12
    "", // 13
    "", // 14
];

let classMode = [
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
    "Class mode is blended, online or face-to-face",
];

let trainingDetails = (i = 0) => {
    let str = programs[i].split("+");
    return {
        "text": str[0].toUpperCase() + " (" + trainingHours[i] + ")\n\n" + classMode[i] + ", 8 hrs per day.\n\nTo enroll present the following documents:\n1. Copy of ID\n2. Birth Certificate\n3. Duly Accomplished Application Form\n\nRegarding for the tuition fee, schedule and other details please direct us through by calling 8569324 local 146 or personal here in our office. Thank you." 
    };
};

let assessmentDetails = () => {
    return "";
};

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
    trainingDetails: trainingDetails
};