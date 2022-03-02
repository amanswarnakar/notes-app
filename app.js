const notes = require("./notes.js");
const yargs = require('yargs');

let title = yargs.argv.title;
let body = yargs.argv.body;
let command = yargs.argv._[0];


if(command === 'add') {
  notes.add(title, body);
} else if (command === 'remove') {
  notes.remove(title);
} else if (command === 'read') {
  notes.read(title);
} else if (command === 'list') {
  notes.list();
} else {
  console.log('Unknown command was used!')
}