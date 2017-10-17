const fs = require('fs');
const path = require('path');
const algoliasearch = require('algoliasearch');


const applicationID = '5NICTDJ5Q3';
const apiKey = require('./secrets.js').apiKey;

console.log('apikey', apiKey);

const client = algoliasearch(applicationID, apiKey);
const index = client.initIndex('mmlafleur');