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
      name: goal.get("name")
    , target: goal.get("target")
    , saved: goal.get("saved")
    , percentage: goal.percentage()
    });
    this.goallist.prepend(li);
  },
  renderNewListItem: function(goal) {
    this.renderListItem(goal);
    this.habitlist.listview("refresh");
  }
});
