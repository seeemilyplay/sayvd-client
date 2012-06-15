window.Habit = Backbone.Model.extend({
  defaults: {
    name: ''
  }
});

window.HabitCollection = Backbone.Collection.extend({
  model: Habit,
  save: function(rawname) {
    var name = rawname.trim();

    var named = name.length > 0 && name !== 'Type your habit';

    var unique = true;
    _.each(this.models, function(habit) {
      if (name === habit.get('name')) {
        unique = false;
      }
    });

    if (named && unique) {
      var habit = new Habit();
      habit.set({
        name: name
      });
      this.add(habit);
      return true;
    } else {
      return false;
    }
  }
});
