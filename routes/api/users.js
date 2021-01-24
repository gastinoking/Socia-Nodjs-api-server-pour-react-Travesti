const express = require('express')
const router = express.Router();


/**
 * @route GET api/users/test
 * @desc Test posts route
 * @access Public
 */
router.get('/test',(req,res) =>res.json({msg:'Bienvenue sur /api/users/test'} ) )

module.exports = router;