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

if (!args.from) {
  throw new Error('Не указан --form path, e.g.\n --from=~/work/');
}
if (!args.to) {
  throw new Error('Не указана remote path, e.g.\n --to=johndaoe@johndaoe.net:~work');
}

var from = args.from;
var to = args.to;
var exclude = args.exclude || '{.git/,.DS_Store,.idea,node_modules/,.bower,.npm,.iml}';

var rsyncArgs = [
  '-azP',
  '--delete',
  from,
  to,
  '--exclude={' + exclude + '}'
];

console.info('Starting ' + 'rsync ' + rsyncArgs.join(' ') + '...');

module.exports = (grunt) => {
  grunt.registerTask('default', 'Sync Task', function () {

    this.async();

    var iteraiton = 0;

    (function execSync () {
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
