let Product = require('../database/product');
let Cat = require('../database/cat');
let Gallery = require('../database/gallery');

module.exports = (express) => {
    let router = express.Router()

    router.get('/', (req, res) => {
        res.send("Guest  route");
    });

     router.get("/products/:start/:count", (req, res) => {
        let start = req.param('start');
        let count = req.param('count');
        Product.paginate(Number(start), Number(count))
            .then(result => res.json({ con: true, msg: result }))
            .catch(error => res.json({ con: false, msg: error }));
     });
      router.get("/cats",(req, res) => {
        Cat.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(error => res.json({ con: false, msg: error }));
    });
      router.get("/galleries",(req, res) => {
        Gallery.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(error => res.json({ con: false, msg: error }));
      });


    return router;


}