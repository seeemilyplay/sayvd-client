Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var AppRouter = Backbone.Router.extend({
	routes: {
		"":            "goallist",
		"goal":        "goallist",
		"goal/create": "newgoal"
	},
	initialize: function() {
	  this.goals = new GoalCollection();
	},
	navigateToNewGoal: function() {
	    app.navigate("goal/create", {trigger: true});
	},
	newgoal: function() {
	    app.showView(new NewGoalView({
	        model: new NewGoal({
	            goals: this.goals
	        }),
	        afterSave: this.navigateToGoalList
	    }));
	},
	navigateToGoalList: function() {
	    app.navigate("goal", {trigger: true});
	},
	goallist: function() {
	    if (this.goals.length==0) {
	        this.navigateToNewGoal();
	    } else {
	        app.showView(new GoalListView({model: this.goals}));
	    }
	},
    showView: function(view) {
        if (this.currentView) {
            this.currentView.close();
        }
        $('body').html(view.render().el);
        this.currentView = view;
        return view;
    }
});

function startApp() {
    tpl.loadTemplates(["goallistitem", "goalsubmenu", "newgoal"], function() {
        app = new AppRouter();
        Backbone.history.start();
    });
}