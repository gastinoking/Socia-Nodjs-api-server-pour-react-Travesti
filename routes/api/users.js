const express = require('express')
const router = express.Router();
const User =  require('../../models/User')
const gravatar = require('gravatar');

/**
 * @route GET api/users/test
 * @desc Test posts route
 * @access Public
 */
router.get('/test',(req,res) =>res.json({msg:'Bienvenue sur /api/users/test'} ) )


/**
 * @route POST api/users/register
 * @desc register
 * @access Public
 */
router.post('/register',async (req,res) => {

    console.log({email:req.body.email});
    
    try {
     const user = await User.findOne ({email:req.body.email})
     if(user){
        res.status(400).json({email:'le Email est déja urilisé !'})
     }else{

        const avatar  = gravatar.url(req.body.name,{
                s:'200', //SIze
                r:'pg', //Rating
                d:'mm', //defaulte
            }) 
            const newUser  = new User({
                name:req.body.name,
                email:req.body.email,
                avatar:avatar,
                password:req.body.password,
            })
            newUser.save()
            console.log(newUser);
            res.status(200).json(newUser)
        }
        

     } catch (error) {
        console.log('error',error);
    }
        
    

    
    
    res.status(200).json(req.body)
 
} )


module.exports = router;