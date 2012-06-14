window.App = Backbone.Model.extend({
  defaults: function() {
    var habits = new HabitCollection();
    var drinkCoffee = new Habit();
    drinkCoffee.set({name: "drink coffee"});
    habits.add(drinkCoffee);
    return {
      habits: habits,
      currenthabit: drinkCoffee
    };
  }()
});

