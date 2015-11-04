/**
Copyright (c) 2015, Simon Räss
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

var reformatTime = require('./time').reformatTime;
var parseTime = require('./time').parseTime;
var win1252 = require("windows-1252");

module.exports = async function(id) {
    var url = "http://o-l.ch/cgi-bin/results?type=rang&kind=all&zwizt=1&csv=1&rl_id=" + id;


    var response = await fetch(url);
    var body = await response.text();
    /*var buffer = await response.arrayBuffer();
    var array = new Int8Array(buffer);
    var byteString = "";
    for(var i in array) {
        byteString += String.fromCharCode(array[i]);
    }

    var body = win1252.decode(byteString)*/

    // convert CSV to JSON
    var categories = { };
    var result = {
      categories: []
    };

    var lines = body.split('\n');
    var header = lines.splice(0, 1)[0].split(';');

    lines.forEach(function(line, idx) {
      var tokens = line.split(';');
      if (tokens.length < 11) {
        return;
      }

      var name = tokens[0];
      var category = categories[name];
      if (!category) {
        category = {
          name: name,
          distance: Math.round(parseFloat(tokens[1]) * 1000),
          ascent: tokens[2],
          controls: parseInt(tokens[3]),
          runners: []
        };
        categories[name] = category;
        result.categories.push(category);
      }

      var runner = {
        id: idx,
        fullName: tokens[5],
        yearOfBirth: tokens[6],
        city: tokens[7],
        club: tokens[8],
        time: reformatTime(tokens[9]),
        startTime: tokens[10],
        splits: []
      };

      if ((tokens.length - 12) < category.controls * 2) {
        // some crappy SOLV data...
        for (var i = tokens.length; i < category.controls * 2 + 12; i++) {
          if (i % 2 === 0) {
            tokens[i] = category.runners.length === 0 ? '???' : category.runners[0].splits[(i - 12) / 2].code;
          } else {
            tokens[i] = '-';
          }
        }
      }

      for (var i = 12; i < tokens.length - 1; i += 2) {
        var time = reformatTime(tokens[i + 1]);
        if (runner.splits.length > 0 && parseTime(time)) {
          var prev = parseTime(runner.splits[runner.splits.length - 1]);
          if (time === prev || tokens[i + 1] === '0.00' || parseTime(tokens[i + 1]) > 180 * 60) {
            // normalize valid manual punches
            time = 's';
          }
        }
        runner.splits.push({ code: tokens[i], time: time });
      }

      category.runners.push(runner);
    });
    return result;
}
