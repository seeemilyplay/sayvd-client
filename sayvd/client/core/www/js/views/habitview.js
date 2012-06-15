window.HabitView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll("renderList", "renderListItem", "renderNewListItem", "initializeListeners", "resetHabitEntry", "startHabitEntry", "saveHabit");
    this.model.bind("add", this.renderNewListItem);

    this.onselect = args.onselect;
    this.renderList();
    this.initializeListeners();
  },
  renderList: function() {
    this.habitlist = $(this.el).find("[data-role='content'] ul");

    _.each(this.model.models, this.renderListItem);
  },
  renderListItem: function(habit) {
    var link = $('<a href="#save" />').text(habit.get("name"));
    var li = $("<li />").append(link);
    this.habitlist.prepend(li);
    var onselect = this.onselect;
    link.click(function() {
      onselect(habit);
    });
  },
  renderNewListItem: function(habit) {
    this.renderListItem(habit);
    this.habitlist.listview("refresh");
  },
  initializeListeners: function() {
    this.nameinput = $(this.el).find("input[type='text']");

    $(this.el).bind("pagebeforeshow", this.resetHabitEntry);
    this.nameinput.click(this.startHabitEntry);

    var okbutton = $(this.el).find("a[data-role='button']");
    okbutton.click(this.saveHabit);
  },
  resetHabitEntry: function() {
    this.nameinput.val("Type your habit");
  },
  startHabitEntry: function() {
    if (this.nameinput.val()==="Type your habit") {
      this.nameinput.val("");
    }
  },
  saveHabit: function() {
    var newHabit = new NewHabit({
      habits: this.model
    });
    newHabit.set({name: this.nameinput.val()});
    var saved = newHabit.save();
    if (saved) {
      this.onselect(this.model.models[this.model.length-1]);
      return true;
    } else {
      return false;
    }
  }
});
