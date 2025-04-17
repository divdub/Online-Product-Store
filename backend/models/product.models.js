import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }

},{
    timestamps: true // this will automatically add the created at and updated at field
});
const Product = mongoose.model('Product', productSchema);
//products is the name of the collection in the database
//Product is the model namen
export default Product;
