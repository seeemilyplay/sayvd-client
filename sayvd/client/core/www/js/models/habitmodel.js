window.Habit = Backbone.Model.extend({
  validate: function(args) {
    if (args.name.length === 0 || args.name === 'Type your habit') {
      return "Invalid name";
    }
  },
  setCost: function(cost) {
    this.set({cost: cost});
    this.save();
  }
});

window.HabitCollection = Backbone.Collection.extend({
  model: Habit,
  localStorage: new Backbone.LocalStorage('habits'),
  addHabit: function(rawname) {
    var name = rawname.trim();

    var unique = true;
    _.each(this.models, function(habit) {
      if (name.toLowerCase() === habit.get('name').toLowerCase()) {
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
