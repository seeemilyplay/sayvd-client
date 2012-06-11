window.SubMenuView = Backbone.View.extend({
    initialize: function() {
        this.template = _.template(tpl.get(this.model.get("template")));
        this.render();
    },
    render: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		
		if (this.model.get("active")) {
		    var activeel = $(this.el).find("a:eq(" + this.model.get("activeindex") + ")");
		    activeel.addClass("active");
		}

		return this;
    }
});