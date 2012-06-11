window.Habit = Backbone.Model.extend({
    defaults: {
	    name:  ""
	}
});

window.HabitCollection = Backbone.Collection.extend({
	model: Habit
});