const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  isUser: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const conversationSchema = new mongoose.Schema({
  conversation_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  user_id: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  preview: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['support', 'technical', 'general', 'feedback', 'other'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'completed'
  },
  messageCount: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt timestamp before saving
conversationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
conversationSchema.index({ user_id: 1, createdAt: -1 });
conversationSchema.index({ user_id: 1, type: 1 });
conversationSchema.index({ user_id: 1, status: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);