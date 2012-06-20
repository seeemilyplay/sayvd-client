window.Habit = Backbone.Model.extend({
  validate: function(args) {
    if (args.name.length === 0 || args.name === 'Type your habit') {
      return "Invalid name";
    }
  }
});

window.HabitCollection = Backbone.Collection.extend({
  model: Habit,
  localStorage: new Backbone.LocalStorage('habits'),
  addHabit: function(rawname) {
    var name = rawname.trim();

    var unique = true;
    _.each(this.models, function(habit) {
      if (name === habit.get('name')) {
        unique = false;
      }
    });
    if (!unique) {
      return false;
    }

    return this.create({
      name: name
    });
  }
});
