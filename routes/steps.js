const express = require("express");
const router = express.Router();
const uuid = require("uuid-random");
const { sign } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');

let today = new Date().toISOString().slice(0, 10);

/**
 * @swagger
 * /api/steps/getAllStepsForTour?idTour=id:
 *   get:
 *     summary: API per ottenere tutti gli step per quel tour
 *     tags:
 *       - Steps
 *     parameters:
 *      - name: idTour
 *        in: path
 *        description: Id del tour
 *        required: true
 *        schema:
 *          type: string
 *        example: 5d6zv3da-00d4-47b9-557f-bdcg6sdc7a99
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.get('/getAllStepsForTour',(req,res) => {
  const sqlAllSteps = `SELECT * FROM steps WHERE id_tour = '${req.params.id}'`;

  connection.query(sqlAllSteps,(error,result) => {
      try {
          if(result.length > 0){
            res.status(200).json({
              success: true,
              message: "STEPS_FOR_TOUR_OK",
              result
            });
          }else{
              res.status(400).json({
                  success: false,
                  message: "NO_STEPS_FOR_TOURS_FOUND"
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
 * /api/steps/newStep:
 *   post:
 *     summary: API per l'inserimento di una nuovo step
 *     tags:
 *       - Steps
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome dello step
 *               description:
 *                 type: string
 *                 description: Descrizione dello step
 *               video:
 *                 type: string
 *                 description: url di un video
 *               latitude:
 *                 type: string
 *                 description: Latitudine della posizione
 *               longitude:
 *                 type: string
 *                 description: Longitudine della posizione
 *               address:
 *                 type: string
 *                 description: Via precisa del tour
 *               orders:
 *                 type: string
 *                 description: Ordine dello step all'interno della lista
 *               idTour:
 *                 type: string
 *                 description: Id dell tour di appartenenza
 *             required:
 *               - name
 *               - description
 *               - video
 *               - latitude
 *               - longitude
 *               - address
 *               - orders
 *               - idTour
 *             example:
 *               name: Il titolo di questo primo step
 *               description: Descrizione dello step
 *               video: www.urlvideo.com
 *               latitude: "43.000000"
 *               longitude: "-75.000000"
 *               address: Via Napoli 43, Napoli
 *               orders: 3
 *               idTour: 78832077-279a-4af6-888f-788a9963b3f4
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.post("/newStep", (req, res) => {
  const sqlTour = "INSERT INTO steps SET ?";

  const customerObj = {
    id: uuid(),
    name: req.body.name,
    description: req.body.description,
    video: req.body.video,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    address: req.body.address,
    orders: req.body.orders,
    data_insert: today,
    id_tour: req.body.idTour
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
