var output = ';module.exports = {';

var exp = [];
var printObjects = false;
for (var item in global) {
  if (item == 'END_TO_THIS_OBJECT') {
    printObjects = false;
  }
  if (printObjects) {
    exp.push(item);
  }

  if (item == 'START_FROM_THIS_OBJECT') {
    printObjects = true;
  }
}

for (i in exp) {
  output += '' + exp[i] + ': ' + exp[i] + (i < (exp.length - 1) ? ', ' : '');
}

output += '};';
console.log(output);
