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
    var selectedgoal = this.model.get('selectedgoal');
    var select = $('<select name="goal" data-native-menu="false"></select>');
    var i = 0;
    _.each(this.model.get('goals').models, function(goal) {
      var item = $('<option />').attr('value', i).text(goal.get('name'));
      i++;
      if (goal === selectedgoal) {
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

    this.amountinput = $(this.el).find("input[name='amount']");

    var okbutton = $(this.el).find("a[data-role='button']");
    okbutton.click(this.save);
  },
  save: function() {
    var newSave = new NewSave({
      saves: this.model.get('saves')
    });
    newSave.set({
      amount: this.amountinput.val(),
      habit: this.model.get('currenthabit'),
      goal: this.model.get('currentgoal')
    });
    return newSave.save();
  }
});
