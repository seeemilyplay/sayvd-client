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
  },
  percentage: function() {
    var saved = this.get("saved");
    var target = this.get("target");
    if (saved<0.01) {
      return 0.0;
    } else if (target<0.01) {
      return 100.0;
    } else {
      return (saved * 100.0);
    }
  }
});

window.GoalCollection = Backbone.Collection.extend({
  model: Goal
});

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