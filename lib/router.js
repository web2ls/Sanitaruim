FlowRouter.route('/', {
    action: function(params, queryParams) {
        console.log('this is main page');
        BlazeLayout.render('mainLayout', { content: "patientList" });
    }
});

FlowRouter.route('/trials/:patientId', {
    action: function(params, queryParams) {
        console.log('this is trials page');
        BlazeLayout.render('mainLayout', { content: "trialList" });
    }
});

FlowRouter.route('/trials/trial/:trialId', {
    action: function(params, queryParams) {
        console.log('this is single trial page');
        BlazeLayout.render('mainLayout', { content: "editTrial" });
    }
});
