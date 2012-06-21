window.Save = Backbone.Model.extend({
  validate: function(args) {
    if (args.habit.length === 0) {
      return "Habit is required";
    }

    if (args.goal.length === 0) {
      return "Goal is required";
    }

    if (args.amount.length < 0.01) {
      return "Amount must be more than 0.01";
    }
  }
});

window.SaveCollection = Backbone.Collection.extend({
  model: Save,
  localStorage: new Backbone.LocalStorage('saves'),
  addSave: function(habit, goal, amount) {
    var now = new Date().getTime();
    var result = this.create({
      time: now,
      habit: habit.get('name'),
      goal: goal.get('name'),
      amount: amount
    });
    if (result) {
      goal.accumulateSaved(amount);
      habit.setCost(amount);
    }
    return result;
  }
});
