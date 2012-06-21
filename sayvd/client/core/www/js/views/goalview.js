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
    var makeData = function(goal) {
      return {
        name: goal.get('name'),
        percentage: goal.percentage().toFixed(1) + '%',
        saved: goal.get('saved').toFixed(2),
        target: goal.get('target').toFixed(0),
        filledwidth: goal.percentage() * 0.86 + '%',
        unfilledwidth: (100 - goal.percentage()) * 0.86 + '%',
        completelyfilled: goal.percentage() === 100.0
      };
    }
    var li = $(_.template($('#goal-li-template').html(), makeData(goal)));
    this.goallist.prepend(li);
    var goallist = this.goallist;
    var refresh = function() {
      try {
        goallist.listview('refresh');
      } catch (e) {
        console.error(e);
      }
    }
    goal.bind('change:saved', function() {
      var data = makeData(goal);
      li.find('.name').text(data.name);
      li.find('.percentage').text(data.percentage);
      li.find('.saved').text(data.saved);
      li.find('.target').text(data.target);
      li.find('.filled.within').css('width', data.filledwidth);
      li.find('.unfilled.within').css('width', data.unfilledwidth);
      if (data.completelyfilled) {
        li.find('.edge.right').addClass('filled');
      } else {
        li.find('.edge.right').removeClass('filled');
      }
      refresh();
      return true;
    });
  },
  renderNewListItem: function(goal) {
    this.renderListItem(goal);
    try {
      this.goallist.listview('refresh');
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
    var goals = this.model.get('goals');
    var result = goals.addGoal(this.nameinput.val(),
                               parseFloat(targetinput.val()));
    if (result) {
      this.model.set({currentgoal: goals.models[goals.length - 1]});
    }
    return result;
  }
});
