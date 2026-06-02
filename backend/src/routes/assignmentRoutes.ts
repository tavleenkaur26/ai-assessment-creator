import express from "express";

import Assignment from "../models/Assignment";
import { upload } from "../middleware/upload";

import { generateQuestions }
from "../services/aiService";
import { io } from "../index";

const router = express.Router();

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

export default router;