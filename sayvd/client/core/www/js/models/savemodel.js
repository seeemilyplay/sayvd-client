window.Save = Backbone.Model.extend({
  defaults: {
    amount: 0.0,
    habit: undefined,
    goal: undefined
  }
});

window.SaveCollection = Backbone.Collection.extend({
  model: Save,
  save: function(habit, goal, amount) {
    if (habit !== undefined &&
        goal !== undefined &&
        amount > 0.0) {
      var save = new Save();
      save.set({
        habit: habit,
        goal: goal,
        amount: amount
      });
      this.add(save);
      goal.save(amount);
      return true;
    } else {
      return false;
    }
  }
});
