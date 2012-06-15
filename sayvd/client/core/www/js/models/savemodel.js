window.Save = Backbone.Model.extend({
  defaults: {
    amount:  0.0,
    habit: undefined,
    goal: undefined
  }
});

window.SaveCollection = Backbone.Collection.extend({
  model: Save
});

window.NewSave = Backbone.Model.extend({
  defaults: {
    amount:  0.0,
    habit: undefined,
    goal: undefined
  },
  initialize: function(args) {
    this.set({saves: args.saves});
  },
  hasHabit: function() {
    return this.get("habit")!==undefined;
  },
  hasGoal: function() {
    return this.get("goal")!==undefined;
  },
  hasAmount: function() {
    return this.get("amount")>0.0;
  },
  isReady: function() {
    return this.hasHabit() && this.hasGoal() && this.hasAmount(); 
  },
  save: function() {
    if (this.isReady()) {
      var save = new Save();
      save.set({
        amount: this.get("amount"),
        habit: this.get("habit"),
        goal: this.get("goal")
      });
      this.get("saves").add(save);
      this.get("goal").save(save.get("amount"));
      return true;
    } else {
      return false;
    }
  }
});