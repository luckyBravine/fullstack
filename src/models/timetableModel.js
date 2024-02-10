import mongoose from "mongoose";

const PdfDetailsSchema = new mongoose.Schema({
  size: {
    type: Number,
    default: false,
  },
  type: {
    type: String,
    default: false,
  },
  name: {
    type: String,
    default: false,
  },
  lastModified: {
    type: String,
    default: false,
  },
});

const Timetable =
  mongoose.models.PdfDetails || mongoose.model("PdfDetails", PdfDetailsSchema);

export default Timetable;
