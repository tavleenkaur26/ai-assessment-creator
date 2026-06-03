import dotenv from "dotenv";
import fs from "fs";
const pdfParse = require("pdf-parse");

dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,

  baseURL: "https://openrouter.ai/api/v1",
});

export const generateQuestions = async (
  assignment: any
) => {
    let documentText = "";

if (assignment.filePath) {
  try {
    if (
      assignment.filePath.endsWith(".txt")
    ) {
      documentText =
        fs.readFileSync(
          assignment.filePath,
          "utf8"
        );
    }

    else if (
      assignment.filePath.endsWith(".pdf")
    ) {
      const buffer =
        fs.readFileSync(
          assignment.filePath
        );

      const pdfData =
        await pdfParse(buffer);

      documentText =
        pdfData.text;
    }
  } catch (error) {
    console.log(
      "Could not read uploaded file"
    );
  }
}
  const prompt = `
Generate a structured question paper.

If Document Content is provided,
create questions strictly from that content.

Do not invent unrelated topics.

Title:
${assignment.title}

Instructions:
${assignment.instructions}

Document Content:
${documentText}

Question Configuration:
${JSON.stringify(
    assignment.questionConfig
  )}

Return ONLY valid JSON.

Required format:

{
  "sections": [
    {
      "title": "Section A",

      "questions": [
        {
          "question": "Question text",

          "difficulty": "Easy",

          "marks": 1
        }
      ]
    }
  ]
}
`;

  const response =
    await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content:
            "You only return valid JSON.",
        },

        {
          role: "user",
          content: prompt,
        },
      ],
    });

  const raw =
    response.choices[0].message.content || "";

  console.log("RAW AI RESPONSE:");
  console.log(raw);

  try {
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.log("JSON PARSE ERROR");

    return {
      sections: [
        {
          title: "Section A",

          questions: [
            {
              question:
                "Sample generated question",

              difficulty: "Easy",

              marks: 1,
            },
          ],
        },
      ],
    };
  }
};