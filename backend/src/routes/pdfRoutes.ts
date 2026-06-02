import express from "express";
import PDFDocument from "pdfkit";
import Assignment from "../models/Assignment";



const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const assignment =
      await Assignment.findById(
        req.params.id
      );

    if (!assignment) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${assignment.title}.pdf"`
    );

    doc.pipe(res);

    doc.fontSize(20).text(
      assignment.title
    );

    doc.moveDown();

    doc.fontSize(12).text(
      `Due Date: ${assignment.dueDate}`
    );

    doc.moveDown();

    doc.text(
      assignment.instructions || ""
    );

    doc.moveDown();
    const paper: any =
      assignment.generatedPaper;

    if (paper?.sections) {
      paper.sections.forEach(
        (section: any) => {
          doc.moveDown();

          doc
            .fontSize(16)
            .text(section.title);

          section.questions.forEach(
            (
              q: any,
              index: number
            ) => {
              doc
                .fontSize(12)
                .text(
                  `${index + 1}. ${
                    q.question
                  }`
                );

              doc.text(
                `Marks: ${q.marks}`
              );

              doc.moveDown();
            }
          );
        }
      );
    }

    doc.end();
      } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error generating PDF",
    });
  }
});

export default router;

