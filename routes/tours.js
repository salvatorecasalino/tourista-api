const express = require("express");
const router = express.Router();
const uuid = require("uuid-random");
const { sign } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');

let today = new Date().toISOString().slice(0, 10);

/**
 * @swagger
 * /api/tours/getAllTours:
 *   get:
 *     summary: API per ottenere tutti i tour
 *     tags:
 *       - Tours
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.get('/getAllTours',(req,res) => {
  console.log(req.body);
  const sqlAllTours = `SELECT * FROM tours`;

  connection.query(sqlAllTours,(error,result) => {
      try {
          if(result.length > 0){
            res.status(200).json({
              success: true,
              message: "TOURS_OK",
              result
            });
          }else{
              res.status(400).json({
                  success: false,
                  message: "NO_TOURS_FOUND"
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
 * /api/tours/getToursForCity?idCity=id:
 *   get:
 *     summary: API per ottenere tutte i tour per quella città
 *     tags:
 *       - Tours
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

router.get('/getToursForCity',(req,res) => {
  const sqlAllToursForCity = `SELECT * FROM tours WHERE city_id = '${req.query.id}'`;

  console.log(req.query.id);

  connection.query(sqlAllToursForCity,(error,result) => {
      try {
          if(result.length > 0){
            res.status(200).json({
              success: true,
              message: "TOURS_FOR_CITY_OK",
              result
            });
          }else{
              res.status(400).json({
                  success: false,
                  message: "NO_CITY_FOR_TOURS_FOUND"
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
 * /api/tours/getToursForUserId?idUser=id:
 *   get:
 *     summary: API per ottenere tutte i tour per un determinato utente
 *     tags:
 *       - Tours
 *     parameters:
 *      - name: id
 *        in: query
 *        description: Id dell'utente
 *        required: true
 *        schema:
 *          type: string
 *        example: 992ec524-0a6c-4256-b9b3-c5b71b124ab9
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.get('/getToursForUserId',(req,res) => {
  const sqlAllToursForUserId = `SELECT * FROM tours WHERE id_user = '${req.query.id}'`;

  connection.query(sqlAllToursForUserId,(error,result) => {
      try {
          if(result.length > 0){
            res.status(200).json({
              success: true,
              message: "TOURS_FOR_USER_OK",
              result
            });
          }else{
              res.status(400).json({
                  success: false,
                  message: "NO_USER_FOR_TOURS_FOUND"
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
 * /api/tours/newTour:
 *   post:
 *     summary: API per l'inserimento di una nuovo tour
 *     tags:
 *       - Tours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome del tour
 *               description:
 *                 type: string
 *                 description: Descrizione del tour
 *               price:
 *                 type: string
 *                 description: prezzo del tour
 *               cityId:
 *                 type: string
 *                 description: Id della città di appartenenza
 *               idUser:
 *                 type: string
 *                 description: Id dell'utente che sta creando il tour
 *             required:
 *               - name
 *               - description
 *               - price
 *               - cityId
 *               - idUser
 *             example:
 *               name: Il bello di Catanzaro
 *               description: Quali sono i migliori luoghi da vedere a catanzaro?
 *               price: 9.90
 *               cityId: 1114d203-118e-432c-b208-14006fc56977
 *               idUser: 992ec524-0a6c-4256-b9b3-c5b71b124ab9
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.post("/newTour", (req, res) => {
  const sqlTour = "INSERT INTO tours SET ?";

  const customerObj = {
    id: uuid(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    city_id: req.body.cityId,
    data_insert: today,
    id_user: req.body.idUser
  };

    try {
      connection.query(sqlTour, customerObj, (error) => {
        if(error){
            res.status(400).json({
                success: false,
                message: "TOUR_NOT_CREATED",
                error: error,
            });
        }else{
          res.status(200).json({
            success: true,
            message: "TOUR_CREATED",
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
