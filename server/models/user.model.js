const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { _id: false });
userSchema.set('id', { select: `${userSchema.options.aliasedPaths.email}  -_id` });

const User = mongoose.model("User", userSchema);

module.exports = User;
