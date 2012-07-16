window.Habit = Backbone.Model.extend({
  setCost: function(cost) {
    this.set({cost: cost});
    this.save();
  }
});

window.HabitCollection = Backbone.Collection.extend({
  model: Habit,
  localStorage: new Backbone.LocalStorage('habits'),
  populate: function() {
    this.create({
      name: 'cash',
      imageurl: '/images/coffee.png',
      cost: 5.00
    });
    this.create({
      name: 'coffee',
      imageurl: '/images/coffee.png',
      cost: 2.50
    });
    this.create({
      name: 'snacks',
      imageurl: '/images/coffee.png',
      cost: 3.50
    });
    this.create({
      name: 'cigarettes',
      imageurl: '/images/coffee.png',
      cost: 5.50
    });
    this.create({
      name: 'alcohol',
      imageurl: '/images/coffee.png',
      cost: 3.50
    });
    this.create({
      name: 'food',
      imageurl: '/images/coffee.png',
      cost: 15.00
    });
    this.create({
      name: 'clothes',
      imageurl: '/images/coffee.png',
      cost: 20.00
    });
  }
});
