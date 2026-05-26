import dotenv from "dotenv";

dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,

  baseURL: "https://openrouter.ai/api/v1",
});

export const generateQuestions = async (
  assignment: any
) => {
  const prompt = `
Generate a structured question paper.

Title:
${assignment.title}

Instructions:
${assignment.instructions}

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