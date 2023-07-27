import mongoose, { Schema } from 'mongoose';

const IncidentSchema = new mongoose.Schema({
  number: {
    type: Number,
    require: true,
    unique: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    default: "inProgress"
  }
});

const Incident = mongoose.model("Incident", IncidentSchema);

export default Incident;