const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/Users');
const BlacklistedToken = require('../models/BlacklistedToken'); 
const signup = async (req, res) => {
  const { email, name } = req.body;
  const password = Math.random().toString(36).slice(-8); 

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashedPassword });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const message = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to Our System',
      text: `Welcome, ${name}! Your password is: ${password}`,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        return res.status(500).send('Email sending failed');
      }
      res.status(200).json({ message: 'User created successfully',status :"ok" });
    });

  } catch (err) {
    res.status(500).send('Error signing up');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch ,"match")
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
};




const logout = async (req, res) => {
  const token = req.body.token; 

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const blacklistedToken = new BlacklistedToken({
      token,
      userId: decoded.userId,
      blacklistedAt: new Date(),
    });

    await blacklistedToken.save();

    res.status(200).json({ message: 'Logout successful', status: 'success' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
const validateToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
  }

  try {
      const decoded = jwt.verify(token,  process.env.JWT_SECRET);
      
      return res.status(200).json({ success: true, message: 'Token is valid', data: decoded,status:"ok" });
  } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = { signup, login,logout,validateToken };
