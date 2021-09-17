require('lodash');
var libNumbersWebpack1 = require('./lib-numbers-webpack.js');
var out = function() {
    process.stdout.write('This is the result for numtoword(1) === ' + libNumbersWebpack1.numToWord(1));
};
out();