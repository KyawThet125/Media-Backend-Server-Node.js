let db = require('./db');
let Product = db.Product;

let save = (obj) => {
    return new Promise((resolve, reject) => {
        let product = new Product(obj);
        product.save((err, data) => {
            if (err) reject(err)
            resolve(data);
        })
    })
}

let all = () => {
    return new Promise((resolve, reject) => {
        Product.find({}, (err, res) => {
            if (err) reject(err)
            resolve(res);
        })
    })
}

let destory = (id) => {
    return new Promise((resolve, reject) => {
        Product.deleteOne({ _id: id }, (err => {
            if (err) reject(err);
            else
                resolve("OK");
                
        }));
    })
}

let paginate = (start, count) => {
    var options = {
        sort: { _id: 1 },
        lean: true,
        page: start,
        limit: count
    };
    console.log("Start :", start, " count : ", count);
    return new Promise((resolve, reject) => {
        Product.paginate({}, options, (err, res) => {
            if (err) reject(err)
            resolve(res);
        })
   })
}

let findProductById = (id)=>{
    return new Promise((resolve,reject)=>{
        Product.find({"cat_id": id},(err,res)=>{
            if(err) reject(err)
                resolve(res);
        })
    })
}

module.exports = {
    save,
    all,
    destory,
    paginate,
    findProductById
}