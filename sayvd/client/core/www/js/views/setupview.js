window.SetupView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('renderHelpPages',
                    'renderSetupPage',
                    'renderTestPage',
                    'initializeListeners',
                    'completeSetup');

    this.helppages = args.helppages;
    this.setuppage = args.setuppage;
    this.testpage = args.testpage;

    this.model.bind("change:setup", this.renderHelpPages);
    this.renderHelpPages();
    this.initializeListeners();
  },
  renderHelpPages: function() {
    var setup = this.model.get("setup");
    _.each(this.helppages, function(page) {
      var footer = page.find("[data-role='footer']");
      var options = page.find(".options");
      var lastnext = page.find(".help-next.last");
      if (setup) {
        footer.show();
        options.show();
        lastnext.hide();
      } else {
        footer.hide();
        options.hide();
        lastnext.show();
      }
    });
  },
  renderSetupPage: function() {
    this.setuppage.find(".goal").text(this.model.get("currentgoal").get("name"));
  },
  renderTestPage: function() {
    this.testpage.find(".goal").text(this.model.get("currentgoal").get("name"));
  },
  initializeListeners: function() {
    this.setuppage.bind('pagebeforeshow', this.renderSetupPage);
    this.testpage.bind('pagebeforeshow', this.renderTestPage);
    this.testpage.find(".done").click(this.completeSetup);
  },
  completeSetup: function() {
    this.model.set({setup: true});
  }
});
