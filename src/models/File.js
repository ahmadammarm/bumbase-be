const mongoose = require('mongoose');
const fileSchema = mongoose.Schema(
  {
    filename: String,
    size: Number,
    mimetype: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  },
);

const file = mongoose.model('file', fileSchema);
module.exports = file;
