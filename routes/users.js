const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const uuid = require("uuid-random");
const saltRounds = 10;
const nodemailer = require("nodemailer");

let today = new Date().toISOString().slice(0, 10);

router.post("/register", (req, res) => {
  const body = req.body;
  const sqlRegister = "INSERT INTO users SET ?";
  const checkEmail = `SELECT COUNT(*) AS qtMail FROM users WHERE email = '${req.body.email}'`;

  connection.query(checkEmail, function (err, result) {
    try {
      let numMail = result[0].qtMail;
      if (numMail > 0) {
        res.status(200).json({
          success: false,
          message: "EMAIL_ALREADY_EXISTS",
        });
      } else {
        let codeVerify = Math.floor(100000 + Math.random() * 300000);
        const customerObj = {
          id: uuid(),
          name: body.name,
          surname: body.surname,
          email: body.email,
          password: bcrypt.hashSync(body.password, saltRounds),
          locale: body.locale,
          creation_date: today,
        };

        var transporter = nodemailer.createTransport({
          host: "smtps.aruba.it",
          logger: true,
          debug: true,
          secure: true,
          port: 465,
          auth: {
            user: "noreply@apparabita.it",
            pass: "!App4r4b1ta",
          },
          tls: {
            minVersion: "TLSv1",
            ciphers: "HIGH:MEDIUM:!aNULL:!eNULL:@STRENGTH:!DH:!kEDH",
          },
        });

        let mailOptions = {
          from: '"Tourista" <noreply@tourista.app>',
          to: body.email,
          subject: "Benvenuto su Tourista",
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta name="x-apple-disable-message-reformatting"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="color-scheme" content="light dark"/> <meta name="supported-color-schemes" content="light dark"/> <title></title> <style type="text/css" rel="stylesheet" media="all"> /* Base ------------------------------ */ @import url("https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"); body{width: 100% !important; height: 100%; margin: 0; -webkit-text-size-adjust: none;}a{color: #0F4186;}a img{border: none;}td{word-break: break-word;}.preheader{display: none !important; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;}/* Type ------------------------------ */ body, td, th{font-family: 'Titillium Web', sans-serif;}h1{margin-top: 0; color: #333333; font-size: 22px; font-weight: bold; text-align: left;}h2{margin-top: 0; color: #333333; font-size: 16px; font-weight: bold; text-align: left;}h3{margin-top: 0; color: #333333; font-size: 14px; font-weight: bold; text-align: left;}td, th{font-size: 16px;}p, ul, ol, blockquote{margin: .4em 0 1.1875em; font-size: 16px; line-height: 1.625;}p.sub{font-size: 13px;}/* Utilities ------------------------------ */ .align-right{text-align: right;}.align-left{text-align: left;}.align-center{text-align: center;}.u-margin-bottom-none{margin-bottom: 0;}/* Buttons ------------------------------ */ .button{background-color: #0F4186; border-top: 10px solid #0F4186; border-right: 18px solid #0F4186; border-bottom: 10px solid #0F4186; border-left: 18px solid #0F4186; display: inline-block; color: #FFF; text-decoration: none; border-radius: 3px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); -webkit-text-size-adjust: none; box-sizing: border-box;}.button--green{background-color: #22BC66; border-top: 10px solid #22BC66; border-right: 18px solid #22BC66; border-bottom: 10px solid #22BC66; border-left: 18px solid #22BC66;}.button--red{background-color: #FF6136; border-top: 10px solid #FF6136; border-right: 18px solid #FF6136; border-bottom: 10px solid #FF6136; border-left: 18px solid #FF6136;}@media only screen and (max-width: 500px){.button{width: 100% !important; text-align: center !important;}}/* Attribute list ------------------------------ */ .attributes{margin: 0 0 21px;}.attributes_content{background-color: #F4F4F7; padding: 16px;}.attributes_item{padding: 0;}/* Related Items ------------------------------ */ .related{width: 100%; margin: 0; padding: 25px 0 0 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;}.related_item{padding: 10px 0; color: #CBCCCF; font-size: 15px; line-height: 18px;}.related_item-title{display: block; margin: .5em 0 0;}.related_item-thumb{display: block; padding-bottom: 10px;}.related_heading{border-top: 1px solid #CBCCCF; text-align: center; padding: 25px 0 10px;}/* Discount Code ------------------------------ */ .discount{width: 100%; margin: 0; padding: 24px; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #F4F4F7; border: 2px dashed #CBCCCF;}.discount_heading{text-align: center;}.discount_body{text-align: center; font-size: 15px;}/* Social Icons ------------------------------ */ .social{width: auto;}.social td{padding: 0; width: auto;}.social_icon{height: 20px; margin: 0 8px 10px 8px; padding: 0;}/* Data table ------------------------------ */ .purchase{width: 100%; margin: 0; padding: 35px 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;}.purchase_content{width: 100%; margin: 0; padding: 25px 0 0 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;}.purchase_item{padding: 10px 0; color: #51545E; font-size: 15px; line-height: 18px;}.purchase_heading{padding-bottom: 8px; border-bottom: 1px solid #EAEAEC;}.purchase_heading p{margin: 0; color: #85878E; font-size: 12px;}.purchase_footer{padding-top: 15px; border-top: 1px solid #EAEAEC;}.purchase_total{margin: 0; text-align: right; font-weight: bold; color: #333333;}.purchase_total--label{padding: 0 15px 0 0;}body{background-color: #0F4186; color: #51545E;}p{color: #51545E;}.email-wrapper{width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #0F4186;}.email-content{width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;}/* Masthead ----------------------- */ .email-masthead{padding: 25px 0; text-align: center;}.email-masthead_logo{width: 94px;}.email-masthead_name{font-size: 16px; font-weight: bold; color: #A8AAAF; text-decoration: none; text-shadow: 0 1px 0 white;}/* Body ------------------------------ */ .email-body{width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;}.email-body_inner{width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #FFFFFF;}.email-footer{width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; text-align: center;}.email-footer p{color: #A8AAAF;}.body-action{width: 100%; margin: 30px auto; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; text-align: center;}.body-sub{margin-top: 25px; padding-top: 25px; border-top: 1px solid #EAEAEC;}.content-cell{padding: 45px;}/*Media Queries ------------------------------ */ @media only screen and (max-width: 600px){.email-body_inner, .email-footer{width: 100% !important;}}@media (prefers-color-scheme: dark){body, .email-body, .email-body_inner, .email-content, .email-wrapper, .email-masthead, .email-footer{background-color: #333333 !important; color: #FFF !important;}p, ul, ol, blockquote, h1, h2, h3, span, .purchase_item{color: #FFF !important;}.attributes_content, .discount{background-color: #222 !important;}.email-masthead_name{text-shadow: none !important;}}:root{color-scheme: light dark; supported-color-schemes: light dark;}</style><!--[if mso]> <style type="text/css"> .f-fallback{font-family: Arial, sans-serif;}</style><![endif]--></head><body> <span class="preheader">Grazie per esserti registrato! Abbiamo raccolto alcune informazioni che potrebbero tornarti utili.</span> <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td align="center"> <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td class="email-masthead"> <a href="https://www.apparabita.it" class="f-fallback email-masthead_name"> <img style="height: 140px;" src="https://www.apparabita.it/mail/images/stemma.png"/> </a> </td></tr><tr> <td class="email-body" width="570" cellpadding="0" cellspacing="0"> <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td class="content-cell"> <div class="f-fallback"> <h1>Benvenuto, ${body.name}!</h1> <p>Benvenuto a bordo della nostra app</p><p>Ancora un'ultimo sforzo:</p><p>Al momento del primo login, la nostra applicazione ti chiederà di verificare il tuo account. Inserisci il codice riportati qui sotto:</p><table class="attributes" width="100%" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td class="attributes_content"> <table width="100%" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td class="attributes_item"> <span class="f-fallback"> <strong>${codeVerify}</strong> </span> </td></tr></table> </td></tr></table> <p><strong>Alcuni consigli per tenere sicuro il tuo account:</strong></p><table class="attributes" width="100%" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td class="attributes_content"> <table width="100%" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td class="attributes_item"> <ol> <li>Tieni al sicuro i dati del tuo account</li><li>Non far sapere a nessuno i tuoi dati di accesso</li><li>Cambia regolarmente la tua password</li><li>Se sospetti che qualcuno stia utilizzando illegalmente il tuo account, avvertici immediatamente</li></ol> </td></tr></table> </td></tr></table> <p>Grazie!<br>Il team di Apparabita</p><table class="body-sub" role="presentation"> <tr> <td> <p class="f-fallback sub">Per qualsiasi informazione, visita il nostro sito web</p><p class="f-fallback sub"><a href="https://www.apparabita.it">https://www.apparabita.it</a> </p></td></tr></table> </div></td></tr></table> </td></tr><tr> <td> <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td class="content-cell" align="center"> <p class="f-fallback sub align-center"> <img style="height:80px;" src="https://www.apparabita.it/mail/images/2wins_logo_w.png"> <br><br>Una produzione<br>&copy; 2Wins Studio. Tutti i diritti riservati. </p></td></tr></table> </td></tr></table> </td></tr></table></body></html>`,
        };

        connection.query(sqlRegister, customerObj, (error) => {
            if(error){
                res.status(200).json({
                    success: false,
                    error: error,
                });
            }else{
                res.status(200).json({
                    success: true,
                    message: "USER_CREATED",
                })
            }
        //   transporter.sendMail(mailOptions, function (err, data) {
        //     if (error) {
        //       res.status(200).json({
        //         success: false,
        //         error: error,
        //       });
        //     } else {
        //       if (err) {
        //         res.status(200).json({
        //           success: false,
        //           message: "USER_NOT_CREATED",
        //           error: err,
        //         });
        //       } else {
        //         res.status(200).json({
        //           success: true,
        //           message: "USER_CREATED",
        //         });
        //       }
        //     }
        //   });

        //   transporter.close();
        });
      }
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: "GENERIC_ERROR: " + error,
      });
    }
  });
});

module.exports = router;
