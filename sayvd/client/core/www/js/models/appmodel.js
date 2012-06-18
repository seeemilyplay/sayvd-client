window.App = Backbone.Model.extend({
  defaults: {
    currenthabit: undefined,
    currentgoal: undefined,
  },
  nuke: function() {
    this.get("habits").nuke();
    this.get("goals").nuke();
    this.get("saves").nuke();
    this.get("setup").nuke();
  }
});
