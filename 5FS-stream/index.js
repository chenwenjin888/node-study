var fs = require('fs');
/*
fs.readFile('my-file.txt','utf8', function (err, data) {
    "use strict";
    console.log(data);
});*/


var stream = fs.createReadStream('my-file.txt', 'utf8');
stream.on('data',function(chunk){
    "use strict";
    console.log(chunk);
});
stream.on('end', function(chunk){
    "use strict";
    console.log(chunk);
});