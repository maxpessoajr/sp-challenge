var express = require('express');
var app = express();

//The Key Function
function isPalindrome(str) {
    var reverse = str.split('').reverse().join('');
    return str === reverse;
};

//Route
app.get('/palindrome/:str', function(req, res) {
  var strParam = req.params.str.toLowerCase();
  strParam = strParam.replace(/[^a-z0-9+]+/gi, '');
  
  if (isPalindrome(strParam)) {
    //console.log("Is Palindrome!");
    res.status(200).end();
  } else {
    //console.log("It's not.");
    res.status(400).end();
  }
});

app.listen(process.env.PORT || 3001);
console.log('Listening on port 3001...');