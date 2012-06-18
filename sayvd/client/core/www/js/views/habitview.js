window.HabitView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('renderList',
                    'renderListItem',
                    'renderNewListItem',
                    'initializeListeners',
                    'startEntry',
                    'reset',
                    'save');
    this.model.get('habits').bind('add', this.renderNewListItem);

    this.app = args.app;
    this.renderList();
    this.initializeListeners();
  },
  renderList: function() {
    this.habitlist = $(this.el).find('.habit-list');
    _.each(this.model.get('habits').models, this.renderListItem);
  },
  renderListItem: function(habit) {
    var app = this.model;
    var link = $('<a href="#save" />').text(habit.get('name'));
    this.habitlist.prepend($('<li />').append(link));
    link.click(function() {
      app.set({ currenthabit: habit });
    });
  },
  renderNewListItem: function(habit) {
    this.renderListItem(habit);
    this.habitlist.listview('refresh');
  },
  initializeListeners: function() {
    this.nameinput = $(this.el).find('input.habit');

    $(this.el).bind('pagebeforeshow', this.reset);
    this.nameinput.click(this.startEntry);

    $(this.el).find('.save').click(this.save);
  },
  startEntry: function() {
    if (this.nameinput.val() === 'Type your habit') {
      this.nameinput.val('');
    }
  },
  reset: function() {
    this.nameinput.val('Type your habit');
  },
  save: function() {
    var result = this.model.get('habits').addHabit(this.nameinput.val());
    if (result) {
      this.reset();
    }
    return result;
  }
});
