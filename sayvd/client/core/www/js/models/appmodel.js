window.App = Backbone.Model.extend({
  defaults: {
    currenthabit: undefined,
    currentgoal: undefined
  },
  createBreakdown: function(goal) {
    var savesforgoal = this.get('saves').where({
      goal: goal.get('name')
    });
    var savesbyhabit = _.groupBy(savesforgoal, function(save) {
      return save.get('habit');
    });
    return _.map(savesbyhabit, function(savesforhabit) {
      return _.reduce(savesforhabit, function(memo, save) {
        return [save.get('habit'), memo[1] + save.get('amount')];
      }, ["", 0.0]);
    });
  }
});
