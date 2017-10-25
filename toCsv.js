var json2csv = require('json2csv');
const fs = require('fs');
const path = require('path');


const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
var fields = Object.keys(products[0]);

try {
  var result = json2csv({ data: products, fields: fields });
  fs.writeFileSync('data.csv', result, 'utf-8');
  console.log(result);
} catch (err) {
  // Errors are thrown for bad options, or if the data is empty and no fields are provided.
  // Be sure to provide fields if it is possible that your data array will be empty.
  console.error(err);
}