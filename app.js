let express = require('express');
app = express();
require('dotenv').config();
let jwt = require('jsonwebtoken');
let passport = require('passport');
let userRoute = require('./route/user')(express, jwt);
let adminRoute = require('./route/admin')(express, passport);
let guestRoute = require('./route/guest')(express);
let bodyParser = require('body-parser');
let JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
 let User = require('./database/user');
let path = require('path');
var cors = require('cors');
    
var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;
let myStrategy = new JwtStrategy(options,  (payload, done) =>{ 
  let name = payload.name;
  let email = payload.email;
  User.findUserByEmail(email)
    .then(user => {
      if (user.name == name)
      {
        done(null, user);
      }
    })
  .catch(error=>done(error,null))

})
 app.use(cors());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(myStrategy);
app.use(express.static(path.join(__dirname , "assets")));
//to get easily image form browser//app.use(express.static(path.join(__dirname, 'asset')));

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/", guestRoute);





/*
let seeder = require('./database/seeder')
seeder.seedCat();
  */

/*
let passgen = require('./helper/passgen');
let pass = '1233';
let encoded = "$2a$10$meMscpGEiHZF7NMWxsUKdO7gJQXbbdXW46rJRbhqZ5FeK6QDNIJp6";
passgen.compare(pass,encoded)
  .then(res => console.log(res))
  .catch(err => console.log(err));
  */
/*
const product = require('./database/product');
product.paginate(1,100)
  
  */

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})