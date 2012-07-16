console.log('loading state...');
var habits = new HabitCollection();
habits.fetch();
console.log('habits (' + habits.length + ')');
if (habits.length === 0) {
  habits.populate();
}

var goals = new GoalCollection();
goals.fetch();
console.log('goals (' + goals.length + ')');
var saves = new SaveCollection();
saves.fetch();
console.log('saves (' + saves.length + ')');
var setup = new Setup();
setup.fetch();
console.log('setup (done = ' + setup.get('done') + ')');

var app = new App({
  habits: habits,
  goals: goals,
  saves: saves,
  setup: setup,
  currenthabit: (habits.models.length > 0) ?
                  habits.models[habits.models.length - 1] :
                  undefined,
  currentgoal: (goals.models.length > 0) ?
                  goals.models[goals.models.length - 1] :
                  undefined
});

var appview = new AppView({
  model: app
});
