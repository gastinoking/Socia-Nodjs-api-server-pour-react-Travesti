const express = require('express')
const mongoose = require('mongodb')


//Routes api
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const posts = require('./routes/api/posts')

const db  = require('./config/keys').mogooseUrl
//Connexion 
mongoose
    .connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(data=>console.log(`Connected MongoDB: ${db}`))
    .catch( error=> console.log(error))


const app = express()

app.get('/',(req,res)=>res.send('Salut les mies!'))

app.use('/api/users',users)
app.use('/api/profiles',profiles)
app.use('/api/posts',posts)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Le serveur a démaré sur le port ${PORT} , et sur le lien http://localhost:${PORT}`))