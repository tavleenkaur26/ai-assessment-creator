"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [instructions, setInstructions] =
    useState("");

  const [questions, setQuestions] = useState([
    {
      type: "MCQ",
      count: 5,
      marks: 1,
      difficulty: "Easy",
    },
  ]);

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...questions];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setQuestions(updated);
  };

  const addQuestionRow = () => {
    setQuestions([
      ...questions,

      {
        type: "Short Answer",
        count: 1,
        marks: 2,
        difficulty: "Medium",
      },
    ]);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5001/assignments",
        {
          title,
          dueDate,
          instructions,

          questionConfig: questions,
        }
      );

      alert("Assignment Created");
    } catch (error) {
      console.log(error);

      alert("Error creating assignment");
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1120] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-sm text-gray-400 mb-2">
            AI Powered Assessment Platform
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Create AI Assessments
          </h1>

          <p className="text-gray-400 mt-4">
            Generate structured question papers
            with AI instantly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] border border-gray-800 rounded-2xl p-8 space-y-8 shadow-2xl"
        >
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Assignment Title
            </label>

            <input
              type="text"
              placeholder="Enter assignment title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Additional Instructions
            </label>

            <textarea
              placeholder="Add generation instructions..."
              value={instructions}
              onChange={(e) =>
                setInstructions(e.target.value)
              }
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl p-4 h-32 outline-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Question Configuration
              </h2>

              <button
                type="button"
                onClick={addQuestionRow}
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                + Add
              </button>
            </div>

            {questions.map((q, index) => (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#1F2937] p-5 rounded-xl border border-gray-700"
              >
                <select
                  value={q.type}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "type",
                      e.target.value
                    )
                  }
                  className="bg-[#111827] p-3 rounded-lg"
                >
                  <option>MCQ</option>
                  <option>Short Answer</option>
                  <option>Long Answer</option>
                </select>

                <input
                  type="number"
                  value={q.count}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "count",
                      Number(e.target.value)
                    )
                  }
                  className="bg-[#111827] p-3 rounded-lg"
                  placeholder="Count"
                />

                <input
                  type="number"
                  value={q.marks}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "marks",
                      Number(e.target.value)
                    )
                  }
                  className="bg-[#111827] p-3 rounded-lg"
                  placeholder="Marks"
                />

                <select
                  value={q.difficulty}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "difficulty",
                      e.target.value
                    )
                  }
                  className="bg-[#111827] p-3 rounded-lg"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all rounded-xl py-4 font-semibold text-lg"
          >
            Generate Assessment
          </button>
        </form>
      </div>
    </main>
  );
}