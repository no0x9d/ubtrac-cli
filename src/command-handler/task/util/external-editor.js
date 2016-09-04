const {tmpDir} = require('os');
const {join} = require('path');
const fs = require('fs');

const blessed = require('blessed');

blessed.Screen.prototype.readEditor = readEditor;
/**
 * taken from blessed and extended to support win32 and cygwin in conemu
 * monkey patch existing method
 * @param options
 * @param callback
 * @returns {*}
 */
function readEditor(options, callback) {
  if (typeof options === 'string') {
    options = {editor: options};
  }

  if (!callback) {
    callback = options;
    options = null;
  }

  if (!callback) {
    callback = function() {};
  }

  options = options || {};

  var self = this
    , editor = determineEditor(options)
    , name = options.name || process.title || 'blessed'
    , rnd = Math.random().toString(36).split('.').pop()
    , file = join(tmpDir(), name + '-' + rnd + '.' + options.ext || 'txt')
    , opt;

  opt = {
    stdio: 'inherit',
    env: process.env,
    cwd: process.env.HOME
  };

  function writeFile(callback) {
    if (!options.value) return callback();
    return fs.writeFile(file, options.value, callback);
  }

  function runExternalEditor(err) {
    if (err) return callback(err);
    return self.exec(editor, args, opt, function (err, success) {
      if (err) return callback(err);
      return fs.readFile(file, 'utf8', function (err, data) {
        return fs.unlink(file, function () {
          if (!success) return callback(new Error('Unsuccessful.'));
          if (err) return callback(err);
          return callback(null, data);
        });
      });
    });
  };

  //rewrite args for vi to be a linux path when in cygwin
  convertToLinuxFileName(file, (err, filename) => {
    if (err) return callback(err);
    args = [filename];
    writeFile(runExternalEditor);
  });
}

function isCygwin() {
  return process.env.TERM === 'cygwin';
}

function determineEditor(options) {
  var fallback, editor;
  fallback = /^win/.test(process.platform) ? 'notepad' : 'vim';
  if (isCygwin()) fallback = 'vim';
  editor = options.editor || process.env.VISUAL || process.env.EDITOR || fallback;
  return editor;
}

function convertToLinuxFileName(file, callback) {
  if (!isCygwin()) {
    return callback(null, file);
  } else {
    require('child_process').exec('cygpath ' + file, callback);
  }
}