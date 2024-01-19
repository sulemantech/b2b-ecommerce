/**
 * @swagger
 * /api/address/create:
 *   post:
 *     summary: Create a new address
 *     tags:
 *       - Address
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               stateId:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 */
const express = require('express');
const router = express.Router();
const addressModel = require('../models/addressModel');

// router.post('/create', ...) - Updated version
router.post('/create', async (req, res) => {
    try {
      const { address, city, stateId, zipCode, country } = req.body;
  
      const newAddress = await addressModel.create({
        address,
        city,
        stateId,
        zipCode,
        country,
      });

      res.status(201).json(newAddress);
    } catch (error) {
      console.error('Error creating address:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Get all addresses
router.get('/getAll', async (req, res) => {
  try {
    const allAddresses = await addressModel.findAll();
    res.status(200).json(allAddresses);
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;
