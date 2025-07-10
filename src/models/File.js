const mongoose = require('mongoose');
const fileSchema = mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    size: Number,
    mimetype: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const file = mongoose.model('file', fileSchema);
module.exports = file;
