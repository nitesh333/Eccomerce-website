const express = require('express');
const router = express.Router();
const {
    createCustomRequest,
    getRequests,
    getMyRequests,
    updateRequestStatus,
} = require('../controllers/customRequestController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
    .post(protect, createCustomRequest)
    .get(protect, admin, getRequests);

router.route('/myrequests').get(protect, getMyRequests);

router.route('/:id/status').put(protect, admin, updateRequestStatus);

module.exports = router;
