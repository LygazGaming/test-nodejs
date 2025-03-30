const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const { ObjectId } = mongoose.Types;

// Middleware để kiểm tra tính hợp lệ của ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }

  next();
};

// GET: Lấy danh sách tất cả users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Thêm user mới
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Lấy thông tin user theo ID
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Cập nhật user theo ID
router.put('/:id', validateObjectId, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Xóa user theo ID
router.delete('/:id', validateObjectId, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;