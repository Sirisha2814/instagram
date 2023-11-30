const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = asyncHandler(async (req, res) => {
  const { username, password, email, phoneNumber } = req.body;

  // Validate that either email or phoneNumber is provided
  if (!(email || phoneNumber)) {
    res.status(400);
    throw new Error('Please provide either email or phoneNumber');
  }

  // // Validate if user with the selected option already exists
  // if (phoneNumber) {
  //   const phoneNumberExists = await User.findOne({ phoneNumber });
  //   if (phoneNumberExists) {
  //     res.status(400);
  //     throw new Error('User with the same phoneNumber already exists');
  //   }
  // }

  // if (email) {
  //   const emailExists = await User.findOne({ email });
  //   if (emailExists) {
  //     res.status(400);
  //     throw new Error('User with the same email already exists');
  //   }
  // }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Determine the selected option (email or phoneNumber)
  const selectedOption = email ? 'email' : 'phoneNumber';

  // Create the user
  const user = await User.create({
    username,
    email: email || undefined,
    phoneNumber: phoneNumber || undefined,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      [selectedOption]: user[selectedOption],
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

  const login = asyncHandler(async (req, res) => {
    const { email, password, phoneNumber } = req.body;
  
    // Check if either email or phoneNumber is provided
    if (!(email || phoneNumber)) {
      res.status(400);
      throw new Error('Please provide either email or phoneNumber');
    }
  
    // Determine the selected option and value
    const selectedOption = email ? 'email' : 'phoneNumber';
    const selectedValue = email || phoneNumber;
  
    const existingUser = await User.findOne({ [selectedOption]: selectedValue });
  
    if (!existingUser) {
      res.status(401);
      throw new Error(`${selectedOption === 'email' ? 'Email' : 'Phone Number'} does not match`);
    }
  
    if (await bcrypt.compare(password, existingUser.password)) {
      const token = generateToken(existingUser._id);
  
      res.status(200).json({
        _id: existingUser._id,
        name: existingUser.username,
        [selectedOption]: existingUser[selectedOption],
        token,
      });
    } else {
      res.status(401);
      throw new Error('Invalid password');
    }
  });
  
const JWT_SECRET = 'abc123';
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); // You can customize this query as needed
  res.json(users);
});

module.exports = {
  register,
  login,
  getUsers,
};
