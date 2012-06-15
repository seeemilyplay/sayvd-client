window.SaveView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll("render", "renderHabit", "renderGoal", "initializeListeners");

    this.initializeListeners();
  },
  render: function() {
    this.renderHabit();
    this.renderGoal();
  },
  renderHabit: function() {
    var habit = $(this.el).find(".habit");
    habit.empty();
    var button = $('<a href="#habit" data-role="button" data-inline="true"></a>');
    button.text(this.model.get("currenthabit").get("name"));
    habit.append(button);
    habit.trigger("create");
  },
  renderGoal: function() {
    var goal = $(this.el).find(".goal");
    goal.empty();
    var selectedgoal = this.model.get("selectedgoal");
    var select = $('<select name="goal" data-native-menu="false"></select>');
    _.each(this.model.get("goals").models, function(goal) {
      var item = $('<option value="0"></option>').text(goal.get("name"));
      if (goal===selectedgoal) {
        item.setAttr("selected", "true");
      }
      select.prepend(item);
    });
    goal.append(select);
    goal.trigger("create");
  },
  initializeListeners: function() {
    $(this.el).bind("pagebeforeshow", this.render);
  }
});
