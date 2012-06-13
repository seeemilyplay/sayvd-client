window.Saving = Backbone.Model.extend({
	defaults: {
		amount:  0.0,
		habit: undefined,
		goal: undefined
	}
});

window.SavingCollection = Backbone.Collection.extend({
	model: Saving
});