window.App = Backbone.Model.extend({
  defaults: function() {
    var habits = new HabitCollection();
    var drinkCoffee = new Habit();
    drinkCoffee.set({name: 'drink coffee'});
    habits.add(drinkCoffee);

    var goals = new GoalCollection();
    var saves = new SaveCollection();

    return {
      habits: habits,
      currenthabit: drinkCoffee,
      goals: goals,
      currentgoal: undefined,
      saves: saves,
      setup: false
    };
  }()
});
