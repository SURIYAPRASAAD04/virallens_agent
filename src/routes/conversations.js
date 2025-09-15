const express = require('express');
const {
  getConversations,
  getConversation,
  deleteConversations,
  saveConversation,
  updateConversationTitle
} = require('../controllers/conversationController');

const router = express.Router();

router.get('/:userId', getConversations);
router.get('/single/:conversationId', getConversation);
router.delete('/bulk', deleteConversations);
router.post('/save', saveConversation);
router.post('/update-title', updateConversationTitle);

module.exports = router;