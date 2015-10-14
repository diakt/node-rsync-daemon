// Execution
// e.g. npm start -- --host=johndaoe@johndaoe.net --local=~/work/ --remote=~work

var exec = require('child_process').exec;
var args = process.argv.reduce((params, arg) => {
  var name = arg.replace(/^--/, '').split('=')[0];

  Object.assign(params, {
    [name]: arg.split('=')[1] || null
  });

  return params;
}, {});

if (!args.host) {
  throw new Error('Не указан host, e.g.\n--host=johndaoe@johndaoe.net');
}
if (!args.local) {
  throw new Error('Не указана local path, e.g.\n --local=~/work/');
}
if (!args.remote) {
  throw new Error('Не указана remote path, e.g.\n --remote=~work');
}

var local = args.local;
var remote = args.host + ':' + args.remote;
var exclude = args.exclude || '{.git/,.DS_Store,.idea,node_modules/,.bower,.npm,.iml}';

var rsyncArgs = [
  '-azP',
  '--delete',
  local,
  remote,
  '--exclude=' + exclude
];

console.info('Starting ' + 'rsync ' + rsyncArgs.join(' ') + '...');

module.exports = (grunt) => {
  grunt.registerTask('default', 'Sync Task', function () {

    this.async();

    var iteraiton = 0;

    (function execSync() {
      exec('rsync ' + rsyncArgs.join(' '), function (error, stdout, stderr) {
        console.log('Iteration: ' + ++iteraiton + ' at ' + (new Date().toLocaleString()));
        console.log(stdout);
        if (stderr) {
          console.log('stderr: ' + stderr);
        }
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        execSync();
      });
    }());
  });
};

