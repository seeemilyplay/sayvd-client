Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var menu = {
  save: 0,
  goals: 1,
  habits: 2
};

var AppRouter = Backbone.Router.extend({
	routes: {
		"":              "goallist",
		"goal":          "goallist",
		"goal/create":   "newgoal",
		"habit":         "habitselect",
		"saving/create": "newsaving"
	},
	initialize: function() {
	  this.goals = new GoalCollection();
	  this.habits = new HabitCollection();
	  this.savings = new SavingCollection();
	  this.newsaving = new NewSaving({
	      savings: this.savings
	  });
	},
	navigateToNewGoal: function() {
	    app.navigate("goal/create", {trigger: true});
	},
	newgoal: function() {
	    app.showPage(menu.goals, new NewGoalView({
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
	        app.showPage(menu.goals, new GoalListView({model: this.goals}));
	    }
	},
	navigateToHabitSelect: function() {
	    app.navigate("habit", {trigger: true});
	},
	habitselect: function() {
	    app.showPage(menu.habits, new HabitSelectView({model: this.habits}));
	},
	navigateToNewSaving: function() {
	    app.navigate("saving/create", {trigger: true});
	},
	newsaving: function() {
	    this.newsaving.set({
	        habit: (!this.newsaving.hasHabit() && this.habits.length>0) ? 
	                   this.habits.models[this.habits.length-1] 
	                   : undefined,
	        goal: (!this.newsaving.hasGoal() && this.goals.length>0) ? 
	                   this.goals.models[this.goals.length-1] 
	                   : undefined,
	          
	    });
	    app.showPage(menu.save, new NewSavingView({model: this.newsaving}));
	},
    showPage: function(menuindex, view) {
        if (this.currentView) {
            this.currentView.close();
        }
        var page = new Page();
        page.set({
          activeindex: menuindex,
          content: view.render().el
        });
        $('body').html(new PageView({
            model: page
        }).render().el);
        this.currentView = view;
        return view;
    }
});

function startApp() {
    tpl.loadTemplates([ "goallistitem", 
                        "goalsubmenu", 
                        "habitselectitem", 
                        "newgoal", 
                        "newhabit",
                        "newsaving",
                        "page" ], function() {
        app = new AppRouter();
        Backbone.history.start();
    });
}