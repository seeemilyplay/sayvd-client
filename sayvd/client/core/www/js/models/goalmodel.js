window.Goal = Backbone.Model.extend({
	defaults: {
		name:  "",
		target: 0.0,
		saved: 0.0
	}
});

window.GoalCollection = Backbone.Collection.extend({
	model: Goal
});