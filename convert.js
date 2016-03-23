var fs = require('fs');

function convert(input_file, output_file) {
  fs.readFile(input_file, function(err, data) {
    if (err) throw err;
    if (data.indexOf('module.exports') < 0) {
      // prepend to file to parse
      // mock the window
      // start recording variables after START_FROM_THIS_OBJECT
      var fileToParse =
      	';var MockBrowser = require(\'mock-browser\').mocks.MockBrowser;' +
      	'var mock = new MockBrowser();var window = MockBrowser.createWindow();' +
      	'var START_FROM_THIS_OBJECT;';
      fileToParse += fs.readFileSync(input_file, 'utf8');

      var interpretFile = fs.readFileSync('interpret.js', 'utf8');
      fileToParse += ';var END_TO_THIS_OBJECT;';

      var script = fileToParse + interpretFile;

      var child = require('child_process').execFile('node',
      	['-e', script],
        function(err, stdout, stderr) {
          if (!!output_file) {
            var original = fs.readFileSync(input_file, 'utf8');
            fs.writeFile(output_file, original.toString() + stdout, function(err) {
              if (err) {
                console.error(err);
              } else {
                console.log('modularized ' + input_file + ' and stored at ' + output_file);
              }
            });
          } else {
            fs.appendFile(input_file, stdout, function(err) {
              if (err) {
                console.error(err);
              } else {
                console.log('modularized ' + input_file);
              }
            });
          }
        }
      );
    } else {
      console.log(input_file + ' already modularized');
    }
  });
}

module.exports = {
  convert: convert
};
