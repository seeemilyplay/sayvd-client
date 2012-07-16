window.HabitView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('renderList',
                    'renderListItem');
    this.app = args.app;
    console.log("habit view");
    this.renderList();
  },
  renderList: function() {
    this.habitlist = $(this.el).find('.habit-list');
    console.log("habit list");
    console.log(this.habitlist);

    _.each(this.model.get('habits').models, this.renderListItem);
  },
  renderListItem: function(habit) {
    var makeData = function(habit) {
      return {
        id: habit.get('id'),
        name: habit.get('name'),
        imageurl: habit.get('imageurl')
      };
    };
    var li = $(_.template($('#habit-li-template').html(), makeData(habit)));
    this.habitlist.append(li);
    var habitlist = this.habitlist;
    var model = this.model;
    li.find("a").click(function() {
      model.set({currenthabit: habit});
    });
  }
});
