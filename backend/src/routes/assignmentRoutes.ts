import express from "express";

import Assignment from "../models/Assignment";

import { generateQuestions }
from "../services/aiService";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const assignment =
      await Assignment.create(req.body);

    const generatedPaper =
      await generateQuestions(assignment);

    assignment.generatedPaper =
      generatedPaper;

    assignment.status = "completed";

    await assignment.save();

    res.status(201).json(assignment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error creating assignment",
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