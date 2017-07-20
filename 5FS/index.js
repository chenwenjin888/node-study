var fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout;
fs.readdir(process.cwd(), function (err, files) {
    console.log(' ');

    if (!files.length) {
        return console.log('    no files to show!');
    }

    console.log('   Select which file or dir \n');

    var stats = [];
    function file(i) {
        "use strict";
        var filename = files[i];

        fs.stat(__dirname + '/' + filename, function (err, stat) {
            stats[i] = stat;
            if (stat.isDirectory()) {
                console.log('   ' + i + '   ' + filename);
            } else {
                console.log('   --' + i + '   ' + filename);
            }

            i++;
            if (i == files.length) {
                read();
            } else {
                file(i);
            }
        });
    }

    function read() {
        console.log('');
        stdout.write('  Enter your choice: ');
        stdin.resume();
        stdin.setEncoding('utf8');

        stdin.on('data', option);
    }

    function option(data) {
        var filename = files[Number(data)];
        if (stats[Number(data)].isDirectory()) {
            fs.readdir(__dirname + '/' + filename, function (err, files) {
                console.log('');
                console.log('   ('+files.length+' files)');
                files.forEach(function (file) {
                    console.log('   -   '+file);
                });
                console.log('');
            });
        } else {
            // stdin.pause();
            fs.readFile(__dirname + '/' + filename, 'utf8', function (err, data) {
                console.log('');
                console.log(data);
            });
        }
    }

    file(0);
});

