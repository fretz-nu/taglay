const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: [String], required: true },
  severity: {
    type: String,
    enum: ['Critical', 'High', 'Info'],
    default: 'Info'
  },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Article', articleSchema);
