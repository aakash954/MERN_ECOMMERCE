import {Cart} from "../Models/Cart.js";

//add product to cart
// export const addToCart = async (req, res) => {
//     try {
//         const { productId, title, price, qty, imgSrc } = req.body;

//         const userId = req.user;

//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             cart = new Cart({ userId, items: [] });
//         }

//         const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

//         if (itemIndex > -1) {
//             cart.items[itemIndex].qty += qty;
//             cart.items[itemIndex].price += price * qty;
//         } else {
//             cart.items.push({ productId, title, price, qty, imgSrc });
//         }

//         await cart.save();
//         res.json({ message: 'Items added to cart', cart });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

//add to card

export const addToCart = async (req, res) => {
    const { productId, title, price, qty, imgSrc } = req.body;
  
    const userId = req.user;
  
    let cart = await Cart.findOne({ userId });
  
    if (!cart) {
      cart = new Cart({ userId, items: [] }); 
    }
     
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
   
    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty; 
    } else {
      cart.items.push({ productId, title, price, qty, imgSrc });
    }
  
    await cart.save();
    res.json({ message: "Items Added To Cart", cart });
  };
  


export const userCart  = async(req, res)=>{
    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart) return res.json({message:'cart not found'});
    res.json({message:"user cart",cart})
    
}

//remove product from cart
export const removeProductfromCart  = async(req, res)=>{
    const productId = req.params.productId;
    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart) return res.json({message:'cart not found'});

    cart.items = cart.items.filter((item)=>item.productId.toString() !== productId)
    await cart.save();
    res.json({message:"product removed from cart"});
    
};

//clear Cart
export const clearCart  = async(req, res)=>{
    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart){
        cart = new Cart({items:[]});
    }
    else{
        cart.items = [];
    }
    await cart.save();
    res.json({message:"cart cleared"});
    
};


//decrease qty from cart
export const decreaseProductQty = async (req, res) => {
    try {
        const { productId, qty } = req.body;

        const userId = req.user;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            if (item.qty > qty) {
                const PricePerUnit = item.price / item.qty;
                item.qty -= qty;
                item.price -= PricePerUnit * qty;
            } else {
                cart.items.splice(itemIndex, 1);
            }
        } else {
            return res.json({ message: "Invalid product id" }); // Return to prevent further execution
        }

        await cart.save();
        res.json({ message: 'Items qty decreased in cart', cart });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
