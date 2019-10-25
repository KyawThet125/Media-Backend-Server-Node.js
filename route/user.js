let passGen = require('../helper/passgen');
let User = require("../database/user");
module.exports = (express, jwt) => {
    let route = express.Router()

    route.post('/api/login', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        User.findUserByEmail(email)
            .then(user => {
                passGen.compare(password, user.password)
                     .then(result => {
                        let payLoad = { email: user.email, name: user.name };
                        let token = jwt.sign(payLoad, process.env.SECRET);
                        res.send({ con: true, token: token });
                    })
                    .catch(error => res.send({ con: false, msg: error }));
            })
            .catch(error => res.send({ con: false, msg: error }));
    });

     route.get('/api/register', (req,res) => {
        let name = req.body.name;
        let email = req.body.email;
         let password = req.body.password;
         
         passGen.encrypt(password)
             .then(pass => {
                 let uobj = {
                     name: name,
                     email: email,
                     password: pass,
                     since : new Date()
                 }

                 User.save(uobj)
                     .then(result => res.send({ con: true, msg: result })
                     )
                     .catch(error => res.send({ con: false, msg: error }));
             
             })
             .catch(err => res.send({ con: false, msg: err }));

    
    })


    return route;


}