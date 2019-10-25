let db = require('./db');
let User = db.User;

let save = (obj) => {
    return new Promise((resolve, reject) => {
        let user = new User(obj);
        user.save((err, data) => {
            if (err) reject(err)
            resolve(data);
        })
    })
}

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, res) => {
            if (err) reject(err)
            resolve(res);
        })
    })
}

let all = ()=>{
    return new Promise((resolve, reject) => {
        User.find({}, (err, res) => {
            if (err) reject(err)
            resolve(res);
        })
    })
}

let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

module.exports = {
    save,
    all,
    findUserById,
    findUserByEmail
}