window.PageView = Backbone.View.extend({
    initialize: function(args) {

        this.template = _.template(tpl.get("page"));
    },
    render: function(eventName) {
        console.log("rendering");
		$(this.el).html(this.template(this.model.toJSON()));
		
		var activeel = $(this.el).find("a:eq(" + this.model.get("activeindex") + ")");
		activeel.addClass("active");
		
		$(this.el).find("[data-role='content']").append(this.model.get("content"));

		return this;
    }
});