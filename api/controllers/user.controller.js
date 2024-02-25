import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import errorHandler from '../utils/error.js';

dotenv.config();

export const checkUserEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const existingUser = await User.findOne({ email });
    res.json({ exists: !!existingUser });
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User has been created!' });
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, 'Wrong password'));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User has been signed out' });
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;

    // Create an object to store the fields to update
    const updateFields = { name };

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
      updateFields.password = req.body.password;
    }

    try {
      // Find the user by ID and update the specified fields
      const updateUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

      if (!updateUser) {
        return next(errorHandler(404, 'User not found'));
      }

      // Omit password from response
      const { password, ...userDetails } = updateUser._doc;
      res.status(200).json(userDetails);
    } catch (error) {
      next(errorHandler(500, 'Internal Server Error'));
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};



export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    res.json(user);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

