/**
Copyright (c) 2015, Simon Räss
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

module.exports.reformatTime = function(str) {
  // normalize missing punch time
  if (str === '-' || str === '-----') {
    return '-';
  }

  // normalize not working control
  if (str === '0.00') {
    return 's';
  }

  // "special" total times (like wrong or missing control)
  if (str.indexOf(':') === -1) {
    return str;
  }

  var splits = str.split(':');
  var seconds;

  if (splits.length === 3) {
    seconds = parseInt(splits[0], 10) * 3600 + parseInt(splits[1], 10) * 60 + parseInt(sanitize(splits[2]), 10);
  } else if (splits.length === 2) {
    seconds = parseInt(splits[0], 10) * 60 + parseInt(sanitize(splits[1]), 10);
  } else {
    seconds = 0;
  }

  return module.exports.formatTime(seconds);
}

var regex = /(-)?[0-9]?[0-9]:[0-9][0-9](:[0-9][0-9])?/;

module.exports.parseTime = function(str) {
  if (!str) {
    return null;
  } else if (typeof str !== 'string') {
    return null;
  } else if (!regex.test(str)) {
    return null;
  }

  var split = str.split(":");
  var result = null;
  if (split.length === 2) {
    var negative = split[0][0] === '-';
    var minutes = parseInt(split[0], 10);
    result = (negative ? -1 : 1) * (Math.abs(minutes) * 60 + parseInt(split[1], 10));
  } else if (split.length === 3) {
    result = parseInt(split[0], 10) * 3600 + parseInt(split[1], 10) * 60 + parseInt(split[2], 10);
  }

  return isNaN(result) ? null : result;
}

module.exports.formatTime = function(seconds) {
  if (seconds >= 0) {
    if (seconds >= 3600) {
      return Math.floor(seconds / 3600) + ":" + pad(Math.floor(seconds / 60) % 60) + ":" + pad(seconds % 60);
    }
    return Math.floor(seconds / 60) + ":" + pad(seconds % 60);
  } else {
    return "-" + Math.floor(-seconds / 60) + ":" + pad(-seconds % 60);
  }
}

function pad(value) {
  return value < 10 ? '0' + value : '' + value
}

function sanitize(value) {
  var comma = value.indexOf(',');
  if (comma != -1) {
    return value.substring(0, comma);
  } else {
    return value;
  }
}
