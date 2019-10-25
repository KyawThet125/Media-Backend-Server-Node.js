let db = require('./db');
let Gallery = db.Gallery;

let save = (obj) => {
    return new Promise((resolve, reject) => {
        let gallery = new Gallery(obj);
        gallery.save((err, res) => {
            if (err) reject(err)
            resolve(res);
        })
    })
}

let all = () => {
    return new Promise((resolve, reject) => {
        Gallery.find({}, (err, res) => {
            if (err) reject(err)
            resolve(res);
        });
    })
}

module.exports = {
    save,
    all
}