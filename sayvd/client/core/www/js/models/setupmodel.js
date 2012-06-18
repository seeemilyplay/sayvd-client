window.Setup = Backbone.Model.extend({
  defaults: {
    id: "setup",
    done: false
  },
  localStorage: new Backbone.LocalStorage("setup"),
  setDone: function() {
    this.set({done: true});
    console.log("saving this");
    this.save();
  }
});
