window.SaveView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll("renderHabit", "initializeListeners");
    
    //this bit is disgusting, need a shared model
    this.app = args.app;
   // this.app.bind("change", this.renderHabit);
    this.initializeListeners();
  },
  renderHabit: function() {
    var habit = $(this.el).find(".habit");
    habit.empty();
    var button = $('<a href="#habit" data-role="button" data-inline="true"></a>');
    button.text(this.app.get("currenthabit").get("name"));
    habit.append(button);
    habit.trigger("create");
  },
  initializeListeners: function() {
    $(this.el).bind("pagebeforeshow", this.renderHabit);
  }
});
