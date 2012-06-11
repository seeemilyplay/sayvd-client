window.NewGoal = Backbone.Model.extend({
	defaults: {
    	name:  "",
    	target: 0.0
	},
	initialize: function(args) {
	    this.set({goals: args.goals});
	},
	isNamed: function() {
	    return this.get("name").length>0;
	},
	hasTarget: function() {
	    return this.get("target")>0.0;
	},
	isReady: function() {
	  return this.isNamed() && this.hasTarget(); 
	},
	save: function() {
	  if (this.isReady()) {
	      var goal = new Goal();
	      goal.set({
	          name: this.get("name"),
	          target: this.get("target")
	      });
	      this.get("goals").add(goal);
	      return true;
	  } else {
	      return false;
	  }
	}
});