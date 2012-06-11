window.GoalListView = Backbone.View.extend({
    initialize: function() {
        this.model.bind("add", function(goal) {
			$(this.el).append(new GoalListItemView({model: goal}).render().el);
		});
    },
    render: function() {
        $(this.el).append(new SubMenuView({
            model: new SubMenu({
	            template: "goalsubmenu",
	            active: true,
	            activeindex: 0
	        })
	    }).el);
        var ul = $("<ul />");
		_.each(this.model.models, function(goal) {
           ul.append(new GoalListItemView({model: goal}).render().el);
		});
		$(this.el).append(ul);
		return this;
    }
});

window.GoalListItemView = Backbone.View.extend({
	tagName: "li",
    initialize: function() {
        this.template = _.template(tpl.get('goallistitem'));
		this.model.bind("change", this.render, this);
    },
    render: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
    }
});