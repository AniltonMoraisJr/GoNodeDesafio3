const mongoose = require('mongoose')
const PurchaseSchema = new mongoose.Schema({
  ad_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Purchase', PurchaseSchema)
