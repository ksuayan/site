// parser.js
var Transform = require('stream').Transform;
    LineStream = require('byline').LineStream;
var lineStream = new LineStream();

var parser = new Transform({objectMode:true});
var col = 0;
parser._transform = function(data, encoding, done) {
  col++;
  var line = data.toString("utf8");
  if (line.indexOf("background: #ffffff;")>-1 ||
      line.indexOf("background: #e7ebec;")>-1) {
      this.push('\n');
      col = 0;
  } else if (line.indexOf("border_list")>-1) {
    line = line.replace(/\.border_list\(.*?\)/,"").trim();
    if (col < 12) {
      line = '"'+line+'",';
    } else {
      line = '"'+line+'"'
    }
    this.push(line);
  }
  done();
}

process.stdin
  .pipe(lineStream)
  .pipe(parser)
  .pipe(process.stdout);
