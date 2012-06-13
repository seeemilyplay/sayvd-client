window.Goal = Backbone.Model.extend({
	defaults: {
		name:  "",
		target: 0.0,
		saved: 0.0
	},
	save: function(amount) {
	    var saved = this.get("saved");
	    this.set({
	        saved: saved + amount
	    });
	}
});

window.GoalCollection = Backbone.Collection.extend({
	model: Goal
});