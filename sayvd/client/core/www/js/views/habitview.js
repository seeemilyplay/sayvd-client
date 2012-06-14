window.HabitView = Backbone.View.extend({
  initialize: function(args) {
    _(this).bindAll("renderList", "renderListItem", "renderNewListItem", "initializeListeners", "resetHabitEntry", "startHabitEntry", "saveHabit");
    this.model.bind("add", this.renderNewListItem);
    
    //this bit is disgusting, need a shared model with saveview
    this.onselect = args.onselect;
    this.renderList();
    this.initializeListeners();
  },
  renderList: function() {
    this.habitlist = $(this.el).find("[data-role='content'] ul");
    
    _.each(this.model.models, this.renderListItem);
  },
  renderListItem: function(habit) {
    var link = $('<a href="#save" />').text(habit.get("name"));
    var li = $("<li />").append(link);
    this.habitlist.prepend(li);
    var onselect = this.onselect;
    link.click(function() {
      onselect(habit);
    });
  },
  renderNewListItem: function(habit) {
    this.renderListItem(habit);
    this.habitlist.listview("refresh");
  },
  initializeListeners: function() {
    this.nameinput = $(this.el).find("input[type='text']");
    
    $(this.el).bind("pagebeforeshow", this.resetHabitEntry);
    this.nameinput.click(this.startHabitEntry);
    
    var okbutton = $(this.el).find("button");
    okbutton.click(this.saveHabit);
  },
  resetHabitEntry: function() {
    this.nameinput.val("Type your habit");
  },
  startHabitEntry: function() {
    if (this.nameinput.val()==="Type your habit") {
      this.nameinput.val("");
    }
  },
  saveHabit: function() {
    var newHabit = new NewHabit({
      habits: this.model
    });
    newHabit.set({name: this.nameinput.val()});
    var saved = newHabit.save();
    if (saved) {
      this.onselect(this.model.models[this.model.length-1]);
      return true;
    } else {
      return false;
    }
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