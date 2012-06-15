window.Habit = Backbone.Model.extend({
  defaults: {
    name:  ""
  }
});

window.HabitCollection = Backbone.Collection.extend({
  model: Habit
});

window.NewHabit = Backbone.Model.extend({
  defaults: {
    name:  ""
  },
  initialize: function(args) {
    this.set({habits: args.habits});
  },
  isNamed: function() {
    return this.get("name").trim().length>0 && this.get("name").trim()!=="Type your habit";
  },
  isUnique: function() {
    var name = this.get("name").trim();
    var unique = true;
    _.each(this.get("habits").models, function(habit) {
      if (name===habit.get("name")) {
        unique = false;
      }
    });
    return unique;
  },
  isReady: function() {
    return this.isNamed() && this.isUnique(); 
  },
  save: function() {
    if (this.isReady()) {
      var habit = new Habit();
        habit.set({
          name: this.get("name").trim()
        });
        this.get("habits").add(habit);
        return true;
  } else {
    return false;
  }
}
});