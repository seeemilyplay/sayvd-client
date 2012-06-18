window.SaveView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('render',
                    'renderHabit',
                    'renderGoal',
                    'initializeListeners',
                    'save');

    this.initializeListeners();
  },
  render: function() {
    this.renderHabit();
    this.renderGoal();
  },
  renderHabit: function() {
    var habit = $(this.el).find('.habit');
    habit.empty();
    var button = $('<a href="#habit" data-role="button" data-inline="true" />');
    button.text(this.model.get('currenthabit').get('name'));
    habit.append(button);
    habit.trigger('create');
  },
  renderGoal: function() {
    var goal = $(this.el).find('.goal');
    goal.empty();
    var currentgoal = this.model.get('currentgoal');
    var select = $('<select name="goal" data-native-menu="false"></select>');
    var i = 0;
    _.each(this.model.get('goals').models, function(goal) {
      var item = $('<option />').attr('value', i).text(goal.get('name'));
      i++;
      if (goal.get("name") === currentgoal.get("name")) {
        item.attr('selected', 'true');
      }
      select.prepend(item);
    });
    var app = this.model;
    select.change(function() {
      app.set({
        currentgoal: app.get('goals').models[select.val()]
      });
    });
    goal.append(select);
    goal.trigger('create');
  },
  initializeListeners: function() {
    $(this.el).bind('pagebeforeshow', this.render);

    $(this.el).find('.save').click(this.save);
  },
  save: function() {
    var amountinput = $(this.el).find('input.amount');
    var saves = this.model.get('saves');
    return saves.addSave(this.model.get('currenthabit'),
                         this.model.get('currentgoal'),
                         parseFloat(amountinput.val()));
  }
});
