import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    dueDate: {
      type: String,
    },

    instructions: {
      type: String,
    },
    fileName: String,
    filePath: String,

    questionConfig: [
      {
        type: {
          type: String,
        },

        count: Number,

        marks: Number,
      },
    ],
    generatedPaper: {
  type: Object,
},

    status: {
      type: String,
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

const Assignment = mongoose.model(
  "Assignment",
  assignmentSchema
);

export default Assignment;