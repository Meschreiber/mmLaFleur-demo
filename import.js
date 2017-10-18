const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const algoliasearch = require('algoliasearch');

const applicationID = '5NICTDJ5Q3';
const apiKey = require('./secrets.js').apiKey;

const client = algoliasearch(applicationID, apiKey);
const index = client.initIndex('mmlafleur_trimmed');

const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8')).products;

let trimmed = [];
products.forEach(product => {
    trimmed.push(_.pick(product, ['title', 'description', 'link', 'mobileLink', 'imageLinks', 'channel', 'ageGroup', 'availability', 'brand', 'color', 'condition', 'gender', 'categories', 'price', 'productType', 'salePrice', 'salePriceEffectiveDate','sizes', 'quantity', 'onlineOnly']));
});

let batchData = [];
for(let i = 0; i < 10; i++) {
    batchData[i] = trimmed.slice(i * 1000, ( ( i + 1 ) * 1000));
}

batchData.forEach(batch => {
    index.addObjects(batch, (err, content) => {
        // index.waitTask(content.taskID, err2 => {
        //     if(!err2) {
        //         console.log('object ' + content.objectID + ' indexed');
        //     }
        // });
        if (err) console.error(Object.keys(err));
    });
});
