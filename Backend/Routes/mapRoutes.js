const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/auth.middlewares');
const mapController = require('../Controllers/map.controller');
const { query } = require('express-validator');
const mapService = require('../services/maps.services');

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapService.getAutoCompleteSuggestions
)






module.exports = router;