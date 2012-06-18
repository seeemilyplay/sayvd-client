window.AppView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('initViews',
                    'initFirstGoalView',
                    'initSetupView',
                    'initSaveView',
                    'initHabitView',
                    'initGoalView',
                    'initNewGoalView',
                    'initFeedView');

    this.beforesetup = false;
    this.aftersetup = false;

    this.model.get('setup').bind('change', this.initViews);
    this.initViews();
  },
  initViews: function() {
    var setup = this.model.get('setup').get('done');
    if (!this.beforesetup) {
      this.initFirstGoalView();
      this.initSetupView();
      this.beforesetup = true;
    }

    if (setup && !this.aftersetup) {
      this.initSaveView();
      this.initHabitView();
      this.initGoalView();
      this.initNewGoalView();
      this.initFeedView();
      this.aftersetup = true;
    }
  },
  initFirstGoalView: function() {
    this.firstgoalview = new NewGoalView({
      model: this.model,
      el: jQuery('#firstgoal'),
      defaultText: 'Insert dream toy here'
    });
  },
  initSetupView: function() {
    this.setupview = new SetupView({
      model: this.model,
      helppages: [jQuery('#help0'),
                  jQuery('#help1'),
                  jQuery('#help2')],
      setuppage: jQuery('#setup'),
      testpage: jQuery('#test'),
      splashpage: jQuery('#splash')
    });
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
      model: this.model.get('goals'),
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
  initFeedView: function() {
    this.feedview = new FeedView({
      model: this.model.get('saves'),
      el: jQuery('#feed')
    });
  }
});
