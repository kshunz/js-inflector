module.exports = function Inflector() {
  var _ = require('lodash');

  this.aliasNames = require('./defaults/aliases');
  this.groupNames = require('./defaults/groups');
  this.stateRegistry = require('./defaults/states');

  _.forEach(this.aliasNames, function(aliases, stateName) {
    var stateFx = this.stateRegistry[stateName];

    aliases.forEach(function(alias) {
      this.stateRegistry[alias] = stateFx;
    });

  });


  this.states = function(state) {
    _.extend(this.stateRegistry, state);
  };

  this.group = function(namedGroups) {
    _.extend(this.groupNames, namedGroups);
  };

  this.alias = function(aliasGroup) {
    _.extend(this.aliasNames, aliasGroup);
  };

  this.getAliasState = function(state) {
    var aliasExists = _.contains(_.flatten(_.values(this.aliasNames)), state);
    var aliasState = state;

    _.forEach(_.invert(this.aliasNames), function(realState, aliasCsv) {
      if(_.contains(aliasCsv.split(','), state)) {
        aliasState = realState;
      }
    });

    return aliasState;

  }

  this.start = function() {

    return function(input, state) {

      var states = state;
      var inputs = input;
      var singleInput = false;
      var needsPriority = false;
      var stateOrderQueue = [];

      if(!Array.isArray(states)) {
        states = [];
        states.push(state);
      }

      if(!Array.isArray(inputs)) {
        singleInput = true;
        inputs = [];
        inputs.push(input);
      }

      states = states.map(function(state) {
        state = this.groupNames[state] || state;

        return state;
      });

      states = _.flatten(states).map(function(state) {
        return this.getAliasState(state);
      });

      needsPriority = states.some(function(state) {
        return state === 'pluralize' || state === 'singularize';
      });

      if(needsPriority) {
        states.forEach(function(curr) {
          if(curr === 'pluralize' || curr === 'singularize') {
            stateOrderQueue.unshift(curr);
          } else {
            stateOrderQueue.push(curr);
          }
        });

        states = stateOrderQueue;
      }

      //Run the state changers
      inputs = inputs.map(function(input) {

        states.forEach(function(state) {

          var fx = this.stateRegistry[state] ? this.stateRegistry[state] : _.noop;

          input = fx.name !== 'noop' ? fx(input) : input;

        });

        return input;
      });

      return singleInput ? _.first(inputs) : inputs;
    };

  };

  return this instanceof Inflector ? this : new Inflector();

}();