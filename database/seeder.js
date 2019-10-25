const fs = require('fs');
const Cat = require('./cat');
const Product = require('./product');

let seedCat = () => {
    fs.readFile('categories.json', (err, data) => {
        if (err)
        {
           console.log(err)
        } else
        {
            let cats = JSON.parse(data);
            cats.forEach((cat) => {
                let obj = {
                    "id": cat.id,
                    "name": cat.name,
                    "image": cat.image,
                    "since": new Date()
                };

                Cat.save(obj)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            })
       }
    })
}

let seedPorduct = () => {
    fs.readFile("products.json", (err, data) => {
        if (err)
        {
            console.log(err);
        } else
        {
            let products = JSON.parse(data);
            products.forEach((product) => {
                let obj = {
                    "cat_id": product.cat_id,
                    "name": product.name,
                    "price" : product.price,
                    "image": product.image,
                    "description": product.description,
                    "since": new Date()
                }
                Product.save(obj)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            })
        }
    })
}

module.exports = {
    seedCat,
    seedPorduct
}