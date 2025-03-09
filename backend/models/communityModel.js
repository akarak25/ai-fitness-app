const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  category: {
    type: String,
    enum: ['success_story', 'question', 'motivation', 'recipe', 'workout', 'general'],
    default: 'general'
  },
  tags: [{
    type: String
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [commentSchema],
  aiModeratedAt: {
    type: Date
  },
  aiModerationResult: {
    isApproved: {
      type: Boolean,
      default: true
    },
    reason: {
      type: String
    }
  }
}, {
  timestamps: true
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: {
    type: String,
    enum: ['weight_loss', 'muscle_gain', 'running', 'yoga', 'nutrition', 'beginners', 'advanced', 'other'],
    default: 'other'
  },
  posts: [postSchema],
  isPrivate: {
    type: Boolean,
    default: false
  },
  pendingMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Group = mongoose.model('Group', groupSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { Group, Post };