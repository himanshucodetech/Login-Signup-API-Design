const { response } = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password, otp } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(409).send('Email already exists');
      } else {
        user = new User({ name, email, password, otp });
        console.log(req.body)
      }
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  },
  async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      if (user.otp !== otp) {
        return res.status(401).send('Invalid OTP');
      }
      user.otp = null;
      await user.save();
      return res.status(200).send({ responseMessage :' Your OTP is Verified successfully' ,responseCode:200});
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      if (name) {
        user.name = name;
      }
      if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id != id) {
          return res.status(409).send('Email already exists');
        }
        user.email = email;
      }
      await user.save();
      return res.status(200).send({responseMessage :' Updated successfully' ,responseCode:200,user });
      // return res.status(200).send({ responseMessage :' Updated successfully' ,responseCode:200});
     
      
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).send({responseMessage :' successfully Get all user data from database' ,responseCode:200,users});
  
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
  
};  

module.exports = UserController;
