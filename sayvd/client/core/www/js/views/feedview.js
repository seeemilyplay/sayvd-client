window.FeedView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll("renderList", "renderListItem", "renderNewListItem");
    this.model.bind("add", this.renderNewListItem);

    this.renderList();
  },
  renderList: function() {
    this.savelist = $(this.el).find("[data-role='content'] ul");

    _.each(this.model.models, this.renderListItem);
  },
  renderListItem: function(save) {
    var li = _.template($("#feed-li-template").html(), {
      habit: save.get("habit").get("name")
    , goal: save.get("goal").get("name")
    , amount: save.get("amount")
    });
    this.savelist.prepend(li);
  },
  renderNewListItem: function(save) {
    this.renderListItem(save);
    this.savelist.listview("refresh");
  }
});