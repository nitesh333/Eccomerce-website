const CustomRequest = require('../models/CustomRequest');

// @desc    Create new custom request
// @route   POST /api/requests
// @access  Private
const createCustomRequest = async (req, res) => {
    const { description, designUrl } = req.body;

    try {
        const customRequest = await CustomRequest.create({
            userId: req.user.id,
            description,
            designUrl
        });

        res.status(201).json(customRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all requests
// @route   GET /api/requests
// @access  Private/Admin
const getRequests = async (req, res) => {
    try {
        const requests = await CustomRequest.findAll();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user's request
// @route   GET /api/requests/myrequests
// @access  Private
const getMyRequests = async (req, res) => {
    try {
        const requests = await CustomRequest.findAll({ where: { userId: req.user.id } });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update request status
// @route   PUT /api/requests/:id/status
// @access  Private/Admin
const updateRequestStatus = async (req, res) => {
    try {
        const customRequest = await CustomRequest.findByPk(req.params.id);

        if (customRequest) {
            customRequest.status = req.body.status || customRequest.status;
            const updatedRequest = await customRequest.save();
            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCustomRequest,
    getRequests,
    getMyRequests,
    updateRequestStatus,
};
