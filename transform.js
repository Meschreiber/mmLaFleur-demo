const fs = require('fs');
const path = require('path');


const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

const transformed = products.map(product => {
    const colonIndex = product.title.indexOf(' ::');
    product.title = product.title.slice(0, colonIndex);
    product.imgUrl = product.imageLinks[0] ?  product.imageLinks[0].link : null;
    return product;
})


fs.writeFileSync('transformed.json', JSON.stringify(transformed));
console.log('done');

