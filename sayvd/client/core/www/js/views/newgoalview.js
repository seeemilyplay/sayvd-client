window.NewGoalView = Backbone.View.extend({
    initialize: function(args) {
        _(this).bindAll("updateName", "updateTarget", "save", "renderSaveButton");

        this.afterSave = args.afterSave;
        this.template = _.template(tpl.get("newgoal"));
        this.renderInitially();
        
        this.model.bind("change", this.renderSaveButton);
    },
    renderInitially: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
        $(this.el).prepend(new SubMenuView({
            model: new SubMenu({
	            template: "goalsubmenu",
	            active: true,
	            activeindex: 1
	        })
	    }).el);
		
		this.nameinput = $(this.el).find("[name=\"name\"]");
		this.targetinput = $(this.el).find("[name=\"target\"]");
		this.savebutton = $(this.el).find(".save");

		this.nameinput.keyup(this.updateName);
		this.targetinput.keyup(this.updateTarget);
		this.targetinput.click(this.updateTarget);
		this.savebutton.click(this.save);

        this.renderSaveButton();

		return this;
    },
    updateName: function() {
        this.model.set({name: this.nameinput.val()});
    },
    updateTarget: function() {
        this.model.set({target: parseInt(this.targetinput.val())});
    },
    save: function() {
        if (this.model.isReady()) {
            var result = this.model.save();
            if (result) {
                this.afterSave();
            }
        }
    },
    renderSaveButton: function() {
        if (this.model.isReady()) {
            this.savebutton.removeClass("disabled");
        } else {
            this.savebutton.addClass("disabled");
        }
    }
});