const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  documentType: {
    type: String,
    enum: ["NID","PASSPORT"],
    required: true
  },
  documentNumber: {
    type: String,
    required: true
  },
  documentImageUrl: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Document = mongoose.model("Document", documentSchema);

export default Document;