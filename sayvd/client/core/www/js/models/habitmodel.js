window.Habit = Backbone.Model.extend({
  validate: function(args) {
    if (args.name.length === 0 || args.name.length === 'Type your habit') {
      return false;
    }
  }
});

window.HabitCollection = Backbone.Collection.extend({
  model: Habit,
  localStorage: new Backbone.LocalStorage('habits'),
  addHabit: function(rawname) {
    var name = rawname.trim();

    _.each(this.models, function(habit) {
      if (name === habit.get('name')) {
        return false;
      }
    });

    return this.create({
      name: name
    });
  }
});
