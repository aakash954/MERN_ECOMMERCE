import {Products} from "../Models/Product.js";

//add product
export const addProduct = async(req,res)=>{
    const{title, description,price,category,qty,imgSrc} = req.body
    try{
        let product = await Products.create({
            title,
            description,
            price,
            category,
            qty,
            imgSrc,
        });
        res.json({message:"Product added successfully",product});
    }catch(error){
        res.json({message:error.message})
    }
}

//get products
export const getProducts= async(req,res)=>{
    let products = await Products.find().sort({createdAt:-1})
    res.json({message:'All products',products})
}

//find product by ID
export const getProductById = async (req, res) => {
    try {
      const id = req.params.id;
      let product = await Products.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Invalid id' });
      }
      res.status(200).json({ message: 'Specific product', product });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  //update product by id
  export const updateProductById = async (req, res) => {
    try {
      const id = req.params.id;
      let product = await Products.findByIdAndUpdate(id, req.body,{new:true});
      if (!product) {
        return res.status(404).json({ message: 'Invalid id' });
      }
      res.status(200).json({ message: 'product has been updated', product });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  //delete product by id
export const deleteProductById = async (req, res) => {
    try {
      const id = req.params.id;
      let product = await Products.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: 'Invalid id' });
      }
      res.status(200).json({ message: 'product has been deleted', product });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};
