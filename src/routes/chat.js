const express = require('express');
const { handleChatMessage, handleRegenerateMessage } = require('../controllers/chatController');
const router = express.Router();

router.post('/message', handleChatMessage);
router.post('/regenerate', handleRegenerateMessage);

module.exports = router;