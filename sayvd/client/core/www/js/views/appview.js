window.AppView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('initViews',
                    'initSaveView',
                    'initHabitView',
                    'initGoalView',
                    'initNewGoalView',
                    'initCurrentGoalView',
                    'initFeedView');

    this.beforesetup = false;
    this.aftersetup = false;

    this.model.get('setup').bind('change', this.initViews);
    this.initViews();
  },
  initViews: function() {
    this.initSaveView();
    this.initHabitView();
    this.initGoalView();
    this.initNewGoalView();
    this.initCurrentGoalView();
    this.initFeedView();
  },
  initSaveView: function() {
    this.saveview = new SaveView({
      model: this.model,
      el: jQuery('#save')
    });
  },
  initHabitView: function() {
    this.habitview = new HabitView({
      model: this.model,
      el: jQuery('#habit')
    });
  },
  initGoalView: function() {
    this.goalview = new GoalView({
      model: this.model,
      el: jQuery('#goal')
    });
  },
  initNewGoalView: function() {
    this.newgoalview = new NewGoalView({
      model: this.model,
      el: jQuery('#newgoal'),
      defaultText: 'Goal'
    });
  },
  initCurrentGoalView: function() {
    this.currentgoalview = new CurrentGoalView({
      model: this.model,
      el: jQuery('#currentgoal')
    });
  },
  initFeedView: function() {
    this.feedview = new FeedView({
      model: this.model.get('saves'),
      el: jQuery('#feed')
    });
  }
});
