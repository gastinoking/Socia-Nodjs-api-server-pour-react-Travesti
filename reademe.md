
 User.findOne({email:req.body.email}).then((user) => {
        if (user) {
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
        
    }).catch((err) => {
        console.log('Erreur ',err);
    });