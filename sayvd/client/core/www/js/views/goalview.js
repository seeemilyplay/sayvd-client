window.GoalView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('renderList',
                    'renderListItem',
                    'renderNewListItem');
    this.model.bind('add', this.renderNewListItem);

    this.renderList();
  },
  renderList: function() {
    this.goallist = $(this.el).find('.goal-list');

    _.each(this.model.models, this.renderListItem);
  },
  renderListItem: function(goal) {
    var li = _.template($('#goal-li-template').html(), {
      name: goal.get('name'),
      target: goal.get('target'),
      saved: goal.get('saved'),
      percentage: goal.percentage()
    });
    this.goallist.prepend(li);
    goal.bind('change:saved', function() {
      $(li).find('.per-num').text(goal.percentage());
      $(li).find('.saved-num').text(goal.get('saved'));
      return true;
    });
  },
  renderNewListItem: function(goal) {
    this.renderListItem(goal);
    this.goallist.listview('refresh');
  }
});

window.NewGoalView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('initializeListeners',
                    'startEntry',
                    'reset',
                    'save');

    this.initializeListeners();
  },
  initializeListeners: function() {
    this.nameinput = $(this.el).find('input.name');

    $(this.el).bind('pagebeforeshow', this.reset);
    this.nameinput.click(this.startEntry);

    $(this.el).find('.save').click(this.save);
  },
  startEntry: function() {
    if (this.nameinput.val() === 'Goal') {
      this.nameinput.val('');
    }
  },
  reset: function() {
    this.nameinput.val('Goal');
  },
  save: function() {
    var targetinput = $(this.el).find('input.target');
    return this.model.save(this.nameinput.val(), parseFloat(targetinput.val()));
  }
});
