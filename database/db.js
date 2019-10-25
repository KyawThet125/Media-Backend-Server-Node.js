const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/mediaDB"
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const autoIncrement = require('mongoose-auto-increment');
const mongoosePaginate = require('mongoose-paginate');

autoIncrement.initialize(mongoose.connection);


let Schema = mongoose.Schema;

let CatSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    since : {type : Date , required: true},
});

let ProdcutSchema = new Schema({
    cat_id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    since: { type: Date, required: true }
});

let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    since: { type: Date, required: true }
});

let gallerySchema = new Schema({
    image : {type : String , required : true}
})

let Cat = mongoose.model('category', CatSchema);
ProdcutSchema.plugin(autoIncrement.plugin, 'product');
ProdcutSchema.plugin(mongoosePaginate);
let Product = mongoose.model('product', ProdcutSchema);
let User = mongoose.model('user', userSchema);
gallerySchema.plugin(autoIncrement.plugin, 'gallery');
let Gallery = mongoose.model('gallery', gallerySchema);

module.exports = {
    Cat,
    Product,
    User,
    Gallery

}