const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 8; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String }
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.otp = generateOTP(); // Generate OTP and add to user object
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
