const express = require('express');
const router = express.Router();
const { 
  createGroup,
  getGroups,
  getGroupById,
  joinGroup,
  leaveGroup,
  manageRequests,
  createPost,
  deletePost,
  likePost,
  addComment,
  deleteComment
} = require('../controllers/communityController');
const { protect } = require('../middlewares/authMiddleware');

// Grup işlemleri
router.route('/groups')
  .post(protect, createGroup)
  .get(protect, getGroups);

router.route('/groups/:id')
  .get(protect, getGroupById);

router.post('/groups/:id/join', protect, joinGroup);
router.post('/groups/:id/leave', protect, leaveGroup);
router.post('/groups/:id/manage-requests', protect, manageRequests);

// Gönderi işlemleri
router.post('/groups/:id/posts', protect, createPost);
router.delete('/posts/:id', protect, deletePost);
router.post('/posts/:id/like', protect, likePost);

// Yorum işlemleri
router.post('/posts/:id/comments', protect, addComment);
router.delete('/comments/:id', protect, deleteComment);

module.exports = router;