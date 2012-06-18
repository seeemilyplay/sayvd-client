window.FeedView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll('renderList', 'renderListItem', 'renderNewListItem');
    this.model.bind('add', this.renderNewListItem);

    this.renderList();
  },
  renderList: function() {
    this.savelist = $(this.el).find('.save-list');
    _.each(this.model.models, this.renderListItem);
  },
  renderListItem: function(save) {
    var li = _.template($('#feed-li-template').html(), {
      habit: save.get('habit'),
      goal: save.get('goal'),
      amount: save.get('amount')
    });
    this.savelist.prepend(li);
  },
  renderNewListItem: function(save) {
    this.renderListItem(save);
    try {
      //todo: figure out why this sometimes errors
      this.savelist.listview('refresh');
    } catch (e) {
      console.error(e);
    }
  }
});
