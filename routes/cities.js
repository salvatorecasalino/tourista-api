const express = require("express");
const router = express.Router();
const uuid = require("uuid-random");
const { sign } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');

let today = new Date().toISOString().slice(0, 10);

/**
 * @swagger
 * /api/cities/getAllCities:
 *   get:
 *     summary: API per ottenere tutte le città
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.get('/getAllCities',(req,res) => {
  console.log(req.body);
  const sqlSelectAllCity = `SELECT * FROM city`;

  connection.query(sqlSelectAllCity,(error,result) => {
      try {
          if(result.length > 0){
            res.status(200).json({
              success: true,
              message: "CITIES_OK",
              result
            });
          }else{
              res.status(400).json({
                  success: false,
                  message: "NO_CITIES_FOUND"
              })
          }
      } catch (error) {
          res.status(400).json({
              success: false,
              message: error
          })
      }
  })
});

/**
 * @swagger
 * /api/cities/getCityFromId?idCity=id:
 *   get:
 *     summary: API per ottenere la singola città
 *     tags:
 *       - Cities
 *     parameters:
 *      - name: id
 *        in: query
 *        description: Id della città
 *        required: true
 *        schema:
 *          type: string
 *        example: 1114d203-118e-432c-b208-14006fc56977
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.get('/getCityFromId',(req,res) => {
  const sqlAllCategories = `SELECT * FROM city WHERE id = '${req.query.id}'`;

  connection.query(sqlAllCategories,(error,result) => {
      try {
          if(result.length > 0){
            res.status(200).json({
              success: true,
              message: "CITY_OK",
              result
            });
          }else{
              res.status(400).json({
                  success: false,
                  message: "NO_CITY_FOUND"
              })
          }
      } catch (error) {
          res.status(400).json({
              success: false,
              message: error
          })
      }
  })
});

/**
 * @swagger
 * /api/cities/newCity:
 *   post:
 *     summary: API per l'inserimento di una nuova città
 *     tags:
 *       - Cities
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *                 description: Nome della città
 *               description:
 *                 type: string
 *                 description: Descrizione della città
 *             required:
 *               - category
 *               - description
 *             example:
 *               city: New York
 *               description: La città che non dorme mai
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.post("/newCity", (req, res) => {
  const sqlNewCity = "INSERT INTO city SET ?";

  const customerObj = {
    id: uuid(),
    city: req.body.city,
    description: req.body.description
  };

    try {
      connection.query(sqlNewCity, customerObj, (error) => {
        if(error){
            res.status(400).json({
                success: false,
                message: "CITY_NOT_CREATED",
                error: error,
            });
        }else{

          res.status(200).json({
            success: true,
            message: "CITY_CREATED",
          })
          
        }
    });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "GENERIC_ERROR: " + error,
      });
    }
});

module.exports = router;
