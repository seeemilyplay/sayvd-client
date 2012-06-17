window.Goal = Backbone.Model.extend({
  defaults: {
    name: '',
    target: 0.0,
    saved: 0.0
  },
  save: function(amount) {
    var saved = this.get('saved');
    this.set({
      saved: saved + amount
    });
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
  save: function(rawname, target) {
    var name = rawname.trim();

    var named = name.length > 0 && name !== 'Goal' && name !== 'Insert dream toy here';
    var targeted = target > 0.0;

    var unique = true;
    _.each(this.models, function(goal) {
      if (name === goal.get('name')) {
        unique = false;
      }
    });

    if (named && targeted && unique) {
      var goal = new Goal();
      goal.set({
        name: name,
        target: target
      });
      this.add(goal);
      return true;
    } else {
      return false;
    }
  }
});

