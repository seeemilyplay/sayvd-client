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
    var li = $(_.template($('#goal-li-template').html(), {
      name: goal.get('name'),
      target: goal.get('target'),
      saved: goal.get('saved'),
      percentage: goal.percentage()
    }));
    this.goallist.prepend(li);
    goal.bind('change:saved', function() {
      li.find('.percentage').text(goal.percentage() + '%');
      li.find('.saved-num').text(goal.get('saved'));
      return true;
    });
  },
  renderNewListItem: function(goal) {
    this.renderListItem(goal);
    try {
      this.goallist.listview("refresh");
    } catch (e) {
      console.error(e);
    }
  }
});

window.NewGoalView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('initializeListeners',
                    'startEntry',
                    'reset',
                    'save');

    this.defaultText = args.defaultText;

    this.initializeListeners();
  },
  initializeListeners: function() {
    this.nameinput = $(this.el).find('input.name');

    $(this.el).bind('pagebeforeshow', this.reset);
    this.nameinput.click(this.startEntry);

    $(this.el).find('.save').click(this.save);
  },
  startEntry: function() {
    if (this.nameinput.val() === this.defaultText) {
      this.nameinput.val('');
    }
  },
  reset: function() {
    this.nameinput.val(this.defaultText);
  },
  save: function() {
    var targetinput = $(this.el).find('input.target');
    var goals = this.model.get("goals");
    var result = goals.save(this.nameinput.val(), parseFloat(targetinput.val()));
    if (result) {
      this.model.set({currentgoal: goals.models[goals.length - 1]});
    }
    return result;
  }
});
