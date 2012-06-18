window.Setup = Backbone.Model.extend({
  defaults: {
    id: "setup",
    done: false
  },
  localStorage: new Backbone.LocalStorage("setup"),
  setDone: function() {
    this.set({done: true});
    this.save();
  }
});
