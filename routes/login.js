const express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post('/',(req,res) => {
    const body = req.body;
    const sqlLogin = `SELECT * FROM users WHERE email = '${body.email}'`;
    
    connection.query(sqlLogin,(error,result) => {
        try {
            if(result.length > 0){
                
                var email = result[0].email;
                var name = result[0].name;
                var surname = result[0].surname;
                var currentId = result[0].id;
                var verify = result[0].verify;
                var code = result[0].verificationCode;
    
                var userPass = result[0].password;
    
                const match = bcrypt.compareSync(body.password, userPass);
    
                if(match){
                    const sqlRealLogin = `SELECT id,name,surname,email FROM users WHERE email = '${body.email}' AND password = '${userPass}'`;
                    userPass = undefined;
                    connection.query(sqlRealLogin, (error, result)=> {
                        const jsontoken = sign({result: result}, "qwe1234",{
                            expiresIn: "90d"
                        })
                        res.status(200).json({
                            success: true,
                            message: "LOGIN_OK",
                            id: currentId,
                            email: email,
                            name: name,
                            surname: surname,
                            code: code,
                            verify: verify,
                            token: jsontoken,
                        })
                    })
                }else{
                    res.status(200).json({
                        success: false,
                        message: "INVALID_MAIL_PASSWORD"
                    })
                }
            }else{
                res.status(200).json({
                    success: false,
                    message: "NO_USER_WITH_THIS_CREDENTIAL"
                })
            }
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error
            })
        }
    })
})

module.exports = router;