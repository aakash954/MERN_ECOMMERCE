import {User} from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//register user
export const register = async(req, res)=>{
    const{name, email, password} = req.body;
    try{
        let user = await User.findOne({email})
        if(user) return res.json({message:"User already existed", success:false});
        const hashPass = await bcrypt.hash(password,10);
        user = await User.create({name, email, password:hashPass});
        res.json({message:"user registered successfully", success:true});
    }catch(error){
        res.json({message:error.message})
    }
}
// login user
export const login = async(req, res)=>{
    const {email, password} = req.body
    try{
        let user = await User.findOne({email});
        if(!user) return res.json({message:"User not found", success:false});
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.json({message:"Invalid credentials", success:false});

        const token = jwt.sign({userId:user._id},"!@#$%^&*()",{
            expiresIn:'365d'
        })
        return res.json({message:`Welcome ${user.name}`,token, success:true});
    }catch(error){
        res.json({message:error.message})
    }
};

// export const login = async(req,res)=>{
//     const {email,password}=req.body;
//     try {
//         let user=await User.findOne({email});
//         if(!user)return res.json({message:"Usr Not Find",success:false});
//         const validPassword=await bcrypt.compare(password,user.password);
//         if(!validPassword)
//             return res.json({message:"Invalid credential",success:false});
//         const token=jwt.sign({userId:user._id},"@#$%&",{
//             expiresIn:'365'
//         })
//         res.json({message:⁠ welcom ${user.name} ⁠,token,success:true})
//     } catch (error) {
//         res.json({message:error.message})
//     }
// }








//get all user 
export const users = async (req, res) => {
    try {
        let users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get profile

export const profile  = async(req,res) => {
    res.json({user: req.user})
   
};
