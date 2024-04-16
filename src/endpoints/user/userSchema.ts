import * as mongoose from 'mongoose';

export let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
});
