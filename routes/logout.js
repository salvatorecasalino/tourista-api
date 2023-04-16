const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router()

router.post('/',(req,res) => {
    const { tokenJwt } = req.body;
    try {
        jwt.sign(tokenJwt, "", { expiresIn: 1 } , (logout, err) => {
            if (logout) {
                res.status(200).json({
                    success: true,
                    message: "LOGOUT_OK"
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: "LOGOUT_KO"
                })
            }
        });    
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error
        })
    }
        
})

module.exports = router;