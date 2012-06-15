window.GoalView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll("renderList", "renderListItem", "renderNewListItem");
    this.model.bind("add", this.renderNewListItem);

    this.renderList();
  },
  renderList: function() {
    this.goallist = $(this.el).find("[data-role='content'] ul");

    _.each(this.model.models, this.renderListItem);
  },
  renderListItem: function(goal) {
    var li = _.template($("#goal-li-template").html(), {
      name: goal.get("name"),
      target: goal.get("target"),
      saved: goal.get("saved"),
      percentage: goal.percentage()
    });
    this.goallist.prepend(li);
  },
  renderNewListItem: function(goal) {
    this.renderListItem(goal);
    this.goallist.listview("refresh");
  }
});

window.NewGoalView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll("initializeListeners",
                    "resetGoalEntry",
                    "startGoalEntry",
                    "saveGoal");
    this.model.bind("add", this.renderNewListItem);

    this.initializeListeners();
  },
  initializeListeners: function() {
    this.nameinput = $(this.el).find("input[type='text']");
    this.targetinput = $(this.el).find("input[name='target']");

    $(this.el).bind("pagebeforeshow", this.resetGoalEntry);
    this.nameinput.click(this.startGoalEntry);

    var okbutton = $(this.el).find("a[data-role='button']");
    okbutton.click(this.saveGoal);
  },
  resetGoalEntry: function() {
    this.nameinput.val("Goal");
  },
  startGoalEntry: function() {
    if (this.nameinput.val() === "Goal") {
      this.nameinput.val("");
    }
  },
  saveGoal: function() {
    var newGoal = new NewGoal({
      goals: this.model
    });
    newGoal.set({
      name: this.nameinput.val(),
      target: parseInt(this.targetinput.val())
    });
    return newGoal.save();
  }
});
