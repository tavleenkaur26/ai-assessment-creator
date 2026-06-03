"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

export default function DashboardPage() {
    const [search, setSearch] = useState("");
  const router = useRouter();

  const [assignments, setAssignments] =
    useState<any[]>([]);

  useEffect(() => {
  fetchAssignments();

  socket.on(
    "assignment-completed",
    () => {
      fetchAssignments();
    }
  );

  return () => {
    socket.off(
      "assignment-completed"
    );
  };
}, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/assignments"
      );

      setAssignments(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredAssignments =

  assignments.filter((assignment) =>

    assignment.title

      .toLowerCase()

      .includes(search.toLowerCase())

  );

  return (
  <main className="min-h-screen bg-[#0B1120] text-white p-8">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">
        Assignments
      </h1>
      

      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 px-5 py-3 rounded-xl"
      >
        Create Assignment
      </button>
    </div>
    <div className="mb-8 bg-[#111827] p-6 rounded-2xl border border-gray-800">
  <h2 className="text-lg text-gray-400">
    Total Assignments
  </h2>

  <p className="text-4xl font-bold mt-2">
    {assignments.length}
  </p>
</div>

    <input
  type="text"
  placeholder="Search assignments..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="w-full mb-6 bg-[#111827] border border-gray-800 rounded-xl p-4"
/>
    {filteredAssignments.length === 0 ? (
  <div className="text-center py-20">
    <h2 className="text-2xl font-semibold">
      No Assignments Yet
    </h2>

    <p className="text-gray-400 mt-2">
      Create your first AI assessment.
    </p>
  </div>
) : (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredAssignments.map(
      (assignment) => (
        <div
  key={assignment._id}
  onClick={() =>
    router.push(
      `/assessment/${assignment._id}`
    )
  }
  className="bg-[#111827] p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition cursor-pointer"
>
          <h2 className="text-xl font-semibold mb-3">
            {assignment.title}
          </h2>

          <p className="text-gray-400">
            Due: {assignment.dueDate}
          </p>

          <div className="mt-4">
  {assignment.status === "completed" ? (
    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
      Completed
    </span>
  ) : (
    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
      Pending
    </span>
  )}
</div>
<div className="flex gap-3 mt-5">
  <button
    onClick={(e) => {
      e.stopPropagation();

      router.push(
        `/assessment/${assignment._id}`
      );
    }}
    className="bg-blue-600 px-4 py-2 rounded-lg text-sm"
  >
    Open
  </button>

  <button
    onClick={(e) => {
      e.stopPropagation();

      window.open(
        `http://localhost:5001/pdf/${assignment._id}`,
        "_blank"
      );
    }}
    className="bg-gray-700 px-4 py-2 rounded-lg text-sm"
  >
    PDF
  </button>
</div>
        </div>
      ))}
    </div>
    )
    }
  </main>
);
}