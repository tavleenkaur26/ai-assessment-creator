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
 <main className="min-h-screen bg-[#F3F4F6] flex">
    <aside className="w-64 bg-white border-r border-gray-300 p-6">

  <button
    onClick={() => router.push("/")}
    className="w-full bg-black text-white rounded-xl py-3 mb-8"
  >
    + Create Assignment
  </button>

  <div className="space-y-4">
    <p className="font-medium text-gray-700">
  Dashboard
</p>

    <p className="font-medium text-gray-700">
      Assignments
    </p>

    <p className="ont-medium text-gray-700">
      My Library
    </p>

    <p className="ont-medium text-gray-700">
      Settings
    </p>
  </div>
</aside>
<div className="flex-1 p-8">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Assignments
      </h1>
      

      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 px-5 py-3 rounded-xl"
      >
        Create Assignment
      </button>
    </div>
    <div className="mb-8 bg-white p-6 rounded-2xl border border-gray-200">
  <h2 className="text-lg text-gray-700">
    Total Assignments
  </h2>

  <p className="text-4xl font-bold mt-2 text-gray-900">
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
 className="w-full mb-6 bg-white border border-gray-300 rounded-xl p-4 text-gray-900 placeholder:text-gray-500"
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
  className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition cursor-pointer"
>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            {assignment.title}
          </h2>

          <p className="text-gray-600">
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
    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm"
  >
    PDF
  </button>

  <button
    onClick={async (e) => {
      e.stopPropagation();

      await axios.delete(
        `http://localhost:5001/assignments/${assignment._id}`
      );

      fetchAssignments();
    }}
    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
  >
    Delete
  </button>
</div>
        </div>
      ))}
    </div>
    )
    }
    </div>
  </main>
);
}