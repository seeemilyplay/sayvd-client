window.NewHabit = Backbone.Model.extend({
	defaults: {
    	name:  ""
	},
	initialize: function(args) {
	    this.set({habits: args.habits});
	},
	isNamed: function() {
	    return this.get("name").length>0;
	},
	isReady: function() {
	  return this.isNamed(); 
	},
	save: function() {
	  if (this.isReady()) {
	      var habit = new Habit();
	      habit.set({
	          name: this.get("name")
	      });
	      this.get("habits").add(habit);
	      return true;
	  } else {
	      return false;
	  }
	}
});