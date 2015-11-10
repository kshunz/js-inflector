module.exports = function states() {
  var _ = require('lodash');

  return {
    'capitalize': function(input) {
      return _.capitalize(input);
    },
    'decapitalize': function(input) {
      var chars = input.split('');
      var firstLetter = chars.shift();
      var lowerFirstLetter = String(firstLetter).toLocaleLowerCase();
      var result;

      chars.unshift(lowerFirstLetter);
      result = chars.join('');

      return result;
    },
    'lowercase': function(input) {
      return String(input).toLocaleLowerCase();
    },
    'pluralize': function(input) {
      var pluralized = String(input);
      var specials = _.invert(require('./special_cases'));

      var code = String(input).toLowerCase();
      var specialWord = specials[code];

      var needsEs = ['z'].some(function(char) {
        return !needsEs && _.endsWith(input, char);
      });

      if(specialWord) {
        pluralized = specialWord;
      }

      if(needsEs) {
        pluralized = input + 'es';
      }

      if(!specialWord && !needsEs) {
        pluralized = input + 's';
      }

      return pluralized;

    },
    'singularize': function(input) {
      var specials = require('./special_cases');

      return specials[input] ? specials[input] : input;
    }
  };
}();
