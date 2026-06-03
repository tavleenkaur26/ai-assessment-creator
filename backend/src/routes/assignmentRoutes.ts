import express from "express";

import Assignment from "../models/Assignment";
import { upload } from "../middleware/upload";

import { generateQuestions }
from "../services/aiService";
import { io } from "../index";

const router = express.Router();
router.delete("/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
});

router.post(
  "/",
  upload.single("file"),
  async (req, res) => {
  try {
    const data = {
  ...req.body,

  questionConfig: JSON.parse(
    req.body.questionConfig
  ),

  fileName:
    (req as any).file?.originalname || "",

  filePath:
    (req as any).file?.path || "",
};
    const assignment =
  await Assignment.create(data);

    const generatedPaper =
      await generateQuestions(assignment);

    assignment.generatedPaper =
      generatedPaper;

    assignment.status = "completed";
    await assignment.save();

    io.emit("assignment-completed", {
  id: assignment._id,
  title: assignment.title,
});
console.log(
  "SOCKET EVENT SENT:",
  assignment.title
);

    res.status(201).json(assignment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error creating assignment",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const assignments =
      await Assignment.find()
        .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching assignments",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const assignment =
      await Assignment.findById(
        req.params.id
      );

    res.json(assignment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching assignment",
    });
  }
});
router.post("/:id/regenerate", async (req, res) => {
  try {
    const assignment =
      await Assignment.findById(
        req.params.id
      );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const generatedPaper =
      await generateQuestions(
        assignment
      );

    assignment.generatedPaper =
      generatedPaper;

    await assignment.save();

    res.json(assignment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Regeneration failed",
    });
  }
});

export default router;