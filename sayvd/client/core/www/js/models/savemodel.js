window.Save = Backbone.Model.extend({
	defaults: {
		amount:  0.0,
		habit: undefined,
		goal: undefined
	}
});

window.SaveCollection = Backbone.Collection.extend({
	model: Save
});

window.NewSaving = Backbone.Model.extend({
	defaults: {
		amount:  0.0,
		habit: undefined,
		goal: undefined
	},
	initialize: function(args) {
	    this.set({savings: args.savings});
	},
	hasHabit: function() {
	    return this.get("habit")!==undefined;
	},
	hasGoal: function() {
	    return this.get("goal")!==undefined;
	},
	hasAmount: function() {
	    return this.get("amount")>0.0;
	},
	isReady: function() {
	  return this.hasHabit() && this.hasGoal() && this.hasAmount(); 
	},
	save: function() {
	  if (this.isReady()) {
	      var saving = new Saving();
	      saving.set({
	          amount: this.get("amount"),
	          habit: this.get("habit"),
	          goal: this.get("goal")
	      });
	      this.get("savings").add(saving);
	      this.get("goal").save(saving.get("amount"));
	      return true;
	  } else {
	      return false;
	  }
	}
});