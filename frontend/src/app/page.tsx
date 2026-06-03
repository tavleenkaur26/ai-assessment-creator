"use client";

import { useRouter } from "next/navigation";
import { useAssignmentStore } from "@/store/assignmentStore";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { setAssignmentId } =
  useAssignmentStore();
  const [file, setFile] = useState<File | null>(null);

  const [dueDate, setDueDate] = useState("");

  const [instructions, setInstructions] =
    useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
  const formData = new FormData();

formData.append("title", title);
formData.append("dueDate", dueDate);
formData.append("instructions", instructions);

formData.append(
  "questionConfig",
  JSON.stringify(questions)
);

if (file) {
  formData.append("file", file);
}

const response = await axios.post(
  "http://localhost:5001/assignments",
  formData
);
  setLoading(false);
  setAssignmentId(response.data._id);
  router.push(
    `/assessment/${response.data._id}`
  );
} catch (error) {
  setLoading(false);
  console.log(error);

  alert("Error creating assignment");
}
  };

  return (
    <main className="min-h-screen bg-[#F3F4F6] text-gray-900 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-sm text-gray-600 mb-2">
            AI Powered Assessment Platform
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Create AI Assessments
          </h1>

          <p className="text-gray-600 mt-4">
            Generate structured question papers
            with AI instantly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8 shadow-lg"
        >
          <div>
            <label className="block mb-2 text-sm text-gray-700">
              Assignment Title
            </label>

            <input
              type="text"
              placeholder="Enter assignment title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-white border border-gray-300 rounded-xl p-4 outline-none"
            />
          </div>
          <div>
  <label className="block mb-2 text-sm text-gray-700">
    Upload PDF / TXT
  </label>

  <input
    type="file"
    accept=".pdf,.txt"
    onChange={(e) =>
      setFile(
        e.target.files?.[0] || null
      )
    }
    className="w-full bg-white border border-gray-300 rounded-xl p-4"
  />

  {file && (
    <p className="text-sm text-green-400 mt-2">
      {file.name}
    </p>
  )}
</div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              className="w-full bg-white border border-gray-300 rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">
              Additional Instructions
            </label>

            <textarea
              placeholder="Add generation instructions..."
              value={instructions}
              onChange={(e) =>
                setInstructions(e.target.value)
              }
              className="w-full bg-white border border-gray-300 rounded-xl p-4 h-32 outline-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
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
                className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200"
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
                  className="bg-white border border-gray-300 p-3 rounded-lg text-gray-900"
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
                  className="bg-white border border-gray-300 p-3 rounded-lg text-gray-900"
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
                  className="bg-white border border-gray-300 p-3 rounded-lg text-gray-900"
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
                  className="bg-white border border-gray-300 p-3 rounded-lg text-gray-900"
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
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 transition-all rounded-xl py-4 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading
    ? "Generating Assessment..."
    : "Generate Assessment"}
</button>
        </form>
      </div>
    </main>
  );
}