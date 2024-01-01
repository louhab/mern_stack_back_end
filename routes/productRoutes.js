import express from 'express' ;
import Product from '../models/modelProduct.js';


const ProductRouter = express.Router();

const seedProducts = [
    {
        name : 'Iphone',
        description : 'The iPhone, a revolutionary device by Apple, epitomizes innovation in the realm of smartphones. Its cutting-edge technology, seamless integration of hardware and software, and elegant design have redefined the way we communicate, work, and engage with technology',
        qty : 3,
        price : 300,
        image : 'https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202_1280.jpg',
        category : '6592a0d697b09ac9ac40865a'
     },
     {
        name : 'samsung',
        description : "Samsung: Spearheading global tech, their diverse lineup of innovative devices and trailblazing advancements constantly redefine what's possible, enriching lives worldwide through groundbreaking technology.",
        qty : 3,
        price : 300,
        image : 'https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938_1280.jpg',
        category : '6592a0d697b09ac9ac40865a'  
     }
];

ProductRouter.post( '/' , async (req, res)=>{
        try {
            const products = await Product.insertMany(seedProducts)
            return res.status(200).send(products)
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                message: error.message
            })
        }
});

ProductRouter.get( '/' , async (req, res)=>{
    try {
        const products = await Product.find({})
        return res.status(200).send(products)
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        })
    }
});


ProductRouter.get( '/:id' , async (req, res)=>{
    try {
        const {id} = req.params ;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(500).send({
                message: 'the provided id is not valid '
            })
        }	
        const product = await Product.findById(id)
        return res.status(200).send(product)
    }
     catch (error) {
         console.log(error);
         return res.status(500).send({
             message: error.message
         })
    }
});

ProductRouter.get( '/category/:id' , async (req, res)=>{
    try {
        const {id} = req.params ;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(500).send({
                message: 'the provided id is not valid '
            })
        }	
        const products = await Product.find({
            category : id
        })
        return res.status(200).send(products)
    }
     catch (error) {
         console.log(error);
         return res.status(500).send({
             message: error.message
         })
    }
});
export default ProductRouter;
