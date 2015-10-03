
var exec = require('child_process').exec,
    alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

for (var i=0,n=alph.length; i<n; i++) {
  var cmd = 'curl --data "btnAlpha='+alph[i]+'" http://www.pshs.edu.ph/nce2015/index.php | html2jade  > '
    + alph[i] + '.jade';
    console.log(">>> ", cmd);
    var child = exec(cmd, function(err, stdout, stderr) {
        if (err) {
          throw err;
        }
    });
}
