const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  picture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file',
  },
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;
