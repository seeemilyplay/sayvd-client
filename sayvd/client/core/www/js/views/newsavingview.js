window.NewSavingView = Backbone.View.extend({
    initialize: function(args) {
        _(this).bindAll("updateAmount", "save", "renderSaveButton");

        this.template = _.template(tpl.get("newsaving"));
        this.renderInitially();
        
        this.model.bind("change", this.renderSaveButton);
    },
    renderInitially: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		
		this.amountinput = $(this.el).find("[name=\"amount\"]");
		this.savebutton = $(this.el).find(".save");

		this.amountinput.keyup(this.updateAmount);
		this.amountinput.click(this.updateAmount);
		this.savebutton.click(this.save);

        this.renderSaveButton();

		return this;
    },
    updateAmount: function() {
        this.model.set({amount: parseInt(this.amountinput.val())});
    },
    save: function() {
        if (this.model.isReady()) {
            var result = this.model.save();
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