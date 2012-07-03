window.GoalView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('renderList',
                    'renderListItem',
                    'renderNewListItem');
    this.model.get("goals").bind('add', this.renderNewListItem);

    this.renderList();
  },
  renderList: function() {
    this.goallist = $(this.el).find('.goal-list');

    _.each(this.model.get("goals").models, this.renderListItem);
  },
  renderListItem: function(goal) {
    var makeData = function(goal) {
      return {
        id: goal.get('id'),
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
    var model = this.model;
    li.find("a").click(function() {
      model.set({currentgoal: goal});
    });
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
      this.model.set({currentgoal: result});
    }
    return result;
  }
});

window.CurrentGoalView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('render',
                    'clearPie',
                    'renderPie');

    $(this.el).bind('pagebeforeshow', this.render);
    $(this.el).bind('pagebeforeshow', this.clearPie);
    $(this.el).bind('pageshow', this.renderPie);
  },
  render: function() {
    $(this.el).find('.name').text(this.model.get('currentgoal').get('name'));
  },
  clearPie: function() {
    $('#habit-pie').empty();
  },
  createColors: function(num) {
    var colors = [];
    for (var i = 0; i < (num - 1); i++) {
      var mod = i % 5;
      if (mod === 0) {
        colors.push('#1E55BC');
      } else if (mod === 1) {
        colors.push('#1D29B2');
      } else if (mod === 2) {
        colors.push('#2372A5');
      } else if (mod === 3) {
        colors.push('#1EA8BC');
      } else {
        colors.push('#1DB29B');
      }
    }
    colors.push('#ABACB2');
    return colors;
  },
  renderPie: function() {
    var goal = this.model.get('currentgoal');
    var savings = this.model.createBreakdown(goal);
    savings.push(['left', Math.max(0, goal.get('target') - goal.get('saved'))]);
    var colors = this.createColors(savings.length);

    var pie = $.jqplot('habit-pie', [savings], {
      seriesDefaults: {
        renderer:$.jqplot.DonutRenderer,
        rendererOptions: {
          thickness: 20,
          shadowOffset: 0,
          startAngle: savings.length > 1 ? -90 : undefined,
          varyBarColor: true
        }
      },
      gridPadding: {top:0, right:0, bottom:0, left:0},
      grid: {
        background: 'transparent',
        borderWidth: 0,
        shadow: false
      },
      seriesColors: colors
    });

    console.log(pie);
  }
});
