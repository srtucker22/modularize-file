#!/usr/bin/env node
console.log('modularizing files');
var program = require('commander');
var converter = require('./convert.js');

function list(val) {
  return val.split(',');
}

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option('-i --input <items comma separated no space>', 'A list of files to modularize', list)
  .option('-o --output <items comma separated no space>', 'A list of outputs for input files', list)
  .parse(process.argv);

if (program.input && program.input.length) {
  for (var i = 0; i < program.input.length; i++) {
    if (program.output && program.output.length > i) {
      converter.convert(program.input[i], program.output[i]);
    } else {
      converter.convert(program.input[i]);
    }
  }
}
