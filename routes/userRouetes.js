import express from 'express' ;

import User from '../models/userModel.js' ;
import { JWT_SECRET } from '../config.js';
import bcrypt from 'bcryptjs' ;
import jwt from 'jsonwebtoken';



const UserRouter = express.Router();

UserRouter.post( '/regiseter' , async (req, res)=>{
        try {
    
            // to check later 
         /*    if(!req.body.username || !req.body.email || !req.body.password || !req.body.address || !req.body.City || !req.body.zipCode){
                return res.status(422).send({
                    error : "all fields are required"
                }
                )
            }  */
            const email = req.body.email
            const exists = await User.findOne({email}) 
            if(exists){
                return res.status(401).send({
                    message: 'the user Is already exists'
                })
            }  
            // store the user 
            const user = new User({
                username : req.body.username,
                email : req.body.email ,
                password : await bcrypt.hash(req.body.password ,10),
                address : req.body.address,
                City : req.body.city,
                zipCode : req.body.zipCode
            });
            const userCreated = await user.save() ;
            if(userCreated){
                return res.status(200).send({
                    message: 'the user is created!'
                })
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Try later , error has occurred"
            })
        }
});


UserRouter.post( '/login' , async (req, res)=>{
    try {

        const email = req.body.email
        const user = await User.findOne({email}) 
        if(user){
            const passwordChek = await bcrypt.compare(req.body.password, user.password)
            if(!passwordChek) {
                return res.status(500).send({
                    message: "Not Valid email or Password"
                })
            }
            else {
                const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "10d" });


                return res.status(200).send({
                    user :{
                        id : user._id,
                        username : user.username ,
                        email  : user.email ,
                        adress : user.adress,
                        city : user.city ,
                        zipCode : user.zipCode, 
                    },
                    token 
                })


            }
        } 
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            message: "Try later , error has occurred"
        })
    }

})
export default UserRouter;
