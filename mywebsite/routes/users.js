const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: '注册失败' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: '用户名或密码错误' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: '用户名或密码错误' });
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: '登录失败' });
  }
});

module.exports = router;
