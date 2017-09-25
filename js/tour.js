function initTour() {
    // Instance the tour
    var tour = new Tour({
        steps: [
            {
                element: "#input",
                title: "The beginning",
                content: "Initially the users just start with a brainstorm session out loud.",
                placement: "top"
            },
            {
                element: "#voice",
                title: "Voice recognition",
                content: "The voice recognition will listen and record everything.",
                placement: "top"
            },
            {
                element: "#demo",
                title: "It's just a mockup",
                content: "In this mockup the user has only a few options to <i>guide the dialog</i> by clicking the buttons.",
                placement: "top"
            },
            {
                element: "#graphContainer",
                title: "Mindmap away",
                content: "Important keywords will be extracted and incorporated into a mindmap.",
                placement: "right"
            },
            {
                element: "#suggestions",
                title: "Suggestions",
                content: "Related information will be shown depending of your recently discussed topics.",
                placement: "left"
            }
        ]});

    // Initialize the tour
    tour.init();

    // Start the tour
    tour.start();
}

