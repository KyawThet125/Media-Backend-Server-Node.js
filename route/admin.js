
let multer = require('multer');
let Product = require('../database/product');
let Cat = require('../database/cat');
let Gallery = require('../database/gallery');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})
var upload = multer({ storage: storage });



module.exports = (express, passport) => {
    let router = express.Router();
//passport.authenticate('jwt',{session:false})
  
    router.post("/image/upload", passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res, next) => {
        let obj = {
            image: req.file.filename
        };
        Gallery.save(obj)
            .then(result => res.json({ con: true, msg: req.file.filename }))
            .catch(error => res.json({ con: false, msg: error }));
    });
    
    router.post("/product/paginate/:start/:count", passport.authenticate('jwt', { session: false }), (req, res) => {
        let start = req.param('start');
        let count = req.param('count');
        Product.paginate(Number(start), Number(count))
            .then(result => res.json({ con: true, msg: result }))
            .catch(error => res.json({ con: false, msg: error }));
    });
    
    router.get("/cat/all", passport.authenticate('jwt', { session: false }), (req, res) => {
        Cat.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(error => res.json({ con: false, msg: error }));
    });
      router.get("/gallery/all", passport.authenticate('jwt', { session: false }), (req, res) => {
        Gallery.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(error => res.json({ con: false, msg: error }));
      });
    
    router.post("/product/create", passport.authenticate('jwt', { session: false }), (req, res) => {
        let obj = {
            cat_id: req.body.cat_id,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description,
            since : Date.now()
        }
        Product.save(obj)
            .then(result => res.json({ con: true, msg: result }))
            .catch(error => res.json({ con: false, msg: error }));
    })

    return router;
}