window.App = Backbone.Model.extend({
  defaults: function() {
    var habits = new HabitCollection();
    var drinkCoffee = new Habit();
    drinkCoffee.set({name: "drink coffee"});
    habits.add(drinkCoffee);

    var goals = new GoalCollection();
    var holidayInIbiza = new Goal();
    holidayInIbiza.set({name: "Holiday in Ibiza", target: 550.0});
    goals.add(holidayInIbiza);
    var snowboard = new Goal();
    var saves = new SaveCollection();
    snowboard.set({name: "Snowboard", target: 400.0});
    goals.add(snowboard);
    return {
      habits: habits,
      currenthabit: drinkCoffee,
      goals: goals,
      currentgoal: snowboard,
      saves: saves
    };
  }()
});
