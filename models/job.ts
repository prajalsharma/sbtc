import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    id: { type: String },
    role: { type: String, required: true },
    jobType: { type: String, required: true },
    location: { type: String, required: true },
    hybrid: { type: String, required: true },
    jobFunction: { type: String, required: true },
    jobDescription: { type: String },
    project: { type: String, required: true },
    image: { type: String },
    experience: { type: String },
    salary: { type: String },
    jobURL: { type: String },
    source: { type: String },
  },
  {
    timestamps: true,
    collection: "starknetjobs",
  }
);

// Static method to fetch jobs sorted by 'id'
JobSchema.statics.fetchSortedJobs = async function () {
  return await this.find({}).sort({ id: 1 }); // Sort by 'id' in ascending order
};

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
