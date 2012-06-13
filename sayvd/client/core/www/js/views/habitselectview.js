window.HabitSelectView = Backbone.View.extend({
    initialize: function() {
        _(this).bindAll("renderNewItem");
        this.model.bind("add", this.renderNewItem);
    },
    renderNewItem: function(habit) {
        this.itemlist.prepend(new HabitSelectItemView({model: habit}).render().el);
    },
    render: function() {
        $(this.el).append(new NewHabitView({
            model: new NewHabit({
                habits: this.model
            })
        }).el);
        var ul = $("<ul />");
		_.each(this.model.models, function(habit) {
           ul.prepend(new HabitSelectItemView({model: habit}).render().el);
		});
		this.itemlist = ul;
		$(this.el).append(ul);
		return this;
    }
});

window.NewHabitView = Backbone.View.extend({
    initialize: function(args) {
        _(this).bindAll("updateName", "save", "renderSaveButton");

        this.template = _.template(tpl.get("newhabit"));
        this.renderInitially();
        
        this.model.bind("change", this.renderSaveButton);
    },
    renderInitially: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		
		this.nameinput = $(this.el).find("[name=\"name\"]");
		this.targetinput = $(this.el).find("[name=\"target\"]");
		this.savebutton = $(this.el).find(".save");

		this.nameinput.keyup(this.updateName);
		this.savebutton.click(this.save);

        this.renderSaveButton();

		return this;
    },
    updateName: function() {
        this.model.set({name: this.nameinput.val()});
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

window.HabitSelectItemView = Backbone.View.extend({
	tagName: "li",
    initialize: function() {
        this.template = _.template(tpl.get('habitselectitem'));
		this.model.bind("change", this.render, this);
    },
    render: function(eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
    }
});