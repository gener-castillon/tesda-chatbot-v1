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

let trainingHours = [
    "64 hrs",
    "438 hrs",
    "292 hrs",
    "196 hrs",
    "280 hrs",
    "316 hrs",
    "118 hrs",
    "260 hrs",
    "",
    "365 hrs",
    "",
    "436 hrs",
    "",
    "264 hrs",
    "501 hrs"
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
    return {
        "text": programs[i].toUpperCase() + " (" + trainingHours[i] + ")\n\n" + classMode[i] + ", 8 hrs per day.\n\nTo enroll present the following documents:\n1. Copy of ID\n2. Birth Certificate\n3. Duly Accomplished Application Form\n\nRegarding for the tuition fee, schedule and other details please direct us through by calling 8569324 local 146 or personal here in our office. Thank you" 
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