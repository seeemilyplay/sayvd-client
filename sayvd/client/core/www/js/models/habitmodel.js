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
      imageurl: '/images/cash.png',
      cost: 5.00
    });
    this.create({
      name: 'coffee',
      imageurl: '/images/coffee.png',
      cost: 2.50
    });
    this.create({
      name: 'snacks',
      imageurl: '/images/snacks.png',
      cost: 3.50
    });
    this.create({
      name: 'cigarettes',
      imageurl: '/images/cigarettes.png',
      cost: 5.50
    });
    this.create({
      name: 'alcohol',
      imageurl: '/images/alcohol.png',
      cost: 3.50
    });
    this.create({
      name: 'food',
      imageurl: '/images/food.png',
      cost: 15.00
    });
  }
});
