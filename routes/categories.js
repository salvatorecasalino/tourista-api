const express = require("express");
const router = express.Router();
const uuid = require("uuid-random");
const { sign } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');

let today = new Date().toISOString().slice(0, 10);

/**
 * @swagger
 * /api/categories/getAllCategories:
 *   get:
 *     summary: API per ottenere tutte le categorie
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.get('/getAllCategories',(req,res) => {
  console.log(req.body);
  const sqlAllCategories = `SELECT * FROM categories`;

  connection.query(sqlAllCategories,(error,result) => {
      try {
          if(result.length > 0){
            res.status(200).json({
              success: true,
              message: "CATEGORIES_OK",
              result
            });
          }else{
              res.status(400).json({
                  success: false,
                  message: "NO_CATEGORIES_FOUND"
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
 * /api/categories/getCategoryFromId?idCategory=id:
 *   get:
 *     summary: API per ottenere tutte le categorie
 *     tags:
 *       - Categories
 *     parameters:
 *      - name: id
 *        in: query
 *        description: Id della categoria
 *        required: true
 *        schema:
 *          type: string
 *        example: d7508453-0a10-409e-8f5f-bd0af7ebe4fb
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.get('/getCategoryFromId',(req,res) => {
  const sqlAllCategories = `SELECT * FROM categories WHERE id = '${req.query.id}'`;

  connection.query(sqlAllCategories,(error,result) => {
      try {
          if(result.length > 0){
            res.status(200).json({
              success: true,
              message: "CATEGORY_OK",
              result
            });
          }else{
              res.status(400).json({
                  success: false,
                  message: "NO_CATEGORY_FOUND"
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
 * /api/categories/newCategory:
 *   post:
 *     summary: API per l'inserimento di una nuova categoria
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: Nome della categoria
 *               description:
 *                 type: string
 *                 description: Descrizione della categoria
 *             required:
 *               - category
 *               - description
 *             example:
 *               category: Food
 *               description: Quali sono i migliori luoghi per mangiare in giro per il mondo? Scoprilo qui
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */

router.post("/newCategory", (req, res) => {
  const sqlRegister = "INSERT INTO categories SET ?";

  const customerObj = {
    id: uuid(),
    category: req.body.category,
    description: req.body.description
  };

    try {
      connection.query(sqlRegister, customerObj, (error) => {
        if(error){
            res.status(400).json({
                success: false,
                message: "CATEGORY_NOT_CREATED",
                error: error,
            });
        }else{
          res.status(200).json({
            success: true,
            message: "CATEGORY_CREATED",
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
