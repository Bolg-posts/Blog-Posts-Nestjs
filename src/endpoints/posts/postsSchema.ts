import * as mongoose from 'mongoose';

export let postsSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});
