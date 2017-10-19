var fs = require('fs'),
    //_ = require('lodash'),
    JSONStream = require('JSONStream'),
    es = require('event-stream');
//node --max_old_space_size=4096 exporter.js

var getStream = function () {
    var jsonData = 'transformed.json',
        stream = fs.createReadStream(jsonData, {
            encoding: 'utf8'
        }),
        parser = JSONStream.parse('*');
    return stream.pipe(parser);
};


var counter = 0;
var filenum = 0;
var stuff = [];

getStream()
    .pipe(es.mapSync(function (data) {
        counter = counter + 1;
        stuff.push(data);
        if (stuff.length === 2000) {
            fs.writeFileSync('chunkB-' + filenum + '.json', JSON.stringify(stuff, null, 2), 'utf-8');
            filenum = filenum + 1;
            stuff = [];
            console.log(counter);
        }

    })).on('close', function (err) {
        fs.writeFileSync('chunkB-' + filenum + '.json', JSON.stringify(stuff, null, 2), 'utf-8');
        console.log('closed');
    }).on('error', function (err) {
        console.log('error' + err);
    });
 