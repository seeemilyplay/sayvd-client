window.Goal = Backbone.Model.extend({
  validate: function(args) {
    if (args.name.length === 0 ||
        args.name === 'Goal' ||
        args.name === 'Insert dream toy here') {
      return false;
    }

    if (args.target < 0.01) {
      return false;
    }
  },
  accumulateSaved: function(amount) {
    var saved = this.get('saved');
    this.set({
      saved: saved + amount
    });
    this.save();
  },
  percentage: function() {
    var saved = this.get('saved');
    var target = this.get('target');
    if (saved < 0.01) {
      return 0.0;
    } else if (target < 0.01) {
      return 100.0;
    } else {
      return (saved * 100.0) / target;
    }
  }
});

window.GoalCollection = Backbone.Collection.extend({
  model: Goal,
  localStorage: new Backbone.LocalStorage('goals'),
  addGoal: function(rawname, target) {
    var name = rawname.trim();

    _.each(this.models, function(goal) {
      if (name === goal.get('name')) {
        return false;
      }
    });

    return this.create({
      name: name,
      target: target,
      saved: 1.0
    });
  }
});
