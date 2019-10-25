let bcrypt = require('bcryptjs');

let encrypt = (pass) => {
    return new Promise((resolve, reject) => {
        let salt = bcrypt.genSaltSync(10);
        let encoded = bcrypt.hash(pass, salt);
        if (encoded !=null)
            resolve(encoded);
        else
            reject("Password Encode Error");
    })
}

let compare = (plainPass, encoded) => {
    return new Promise((resolve, reject) => {
        let con = bcrypt.compare(plainPass, encoded);
        if (con)
            resolve(con)
        else
            reject(con);
    });
}

module.exports = {
    encrypt,
    compare
}