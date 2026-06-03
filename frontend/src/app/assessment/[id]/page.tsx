import RegenerateButton from "@/components/RegenerateButton";
async function getAssignment(id: string) {
  const res = await fetch(
    `http://localhost:5001/assignments/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const assignment = await getAssignment(id);

  const paper =
    assignment?.generatedPaper || {
      sections: [],
    };

  return (
    <main className="min-h-screen bg-[#F3F4F6] py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-10 border border-gray-100">
        <div className="text-center border-b pb-6 mb-8">
  <h1 className="text-4xl font-bold text-gray-900">
    AI Generated Assessment
  </h1>

  <p className="mt-3 text-gray-700">
    Smart Question Paper Generator
  </p>

  <div className="mt-6 text-sm space-y-2">
    <p className="text-gray-900">
  <strong>Title:</strong> {assignment.title}
</p>

<p className="text-gray-900">
  <strong>Due Date:</strong> {assignment.dueDate}
</p>
<div className="mt-6">
  <RegenerateButton
    id={assignment._id}
  />
</div>
  </div>
</div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
  <div>
    <p className="font-semibold text-gray-800">
      Student Name
    </p>
    <div className="border-b mt-6"></div>
  </div>

  <div>
    <p className="font-semibold text-gray-800">
  Roll Number
</p>
    <div className="border-b mt-6"></div>
  </div>

  <div>
    <p className="font-semibold text-gray-800">
  Section
</p>
    <div className="border-b mt-6"></div>
  </div>
</div>
        <div className="space-y-10">
          {paper.sections.map(
            (section: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
  {section.title}
</h2>

                  <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
                    Attempt all questions
                  </div>
                </div>

                <div className="space-y-6">
                  {section.questions.map(
                    (
                      q: any,
                      i: number
                    ) => (
                      <div
                        key={i}
                        className="border-b pb-5"
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <p className="font-semibold text-lg text-gray-900 leading-relaxed">
                              {i + 1}.{" "}
                              {q.question}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div
                              className={`
                              px-3 py-1 rounded-full text-sm text-white

                              ${
                                q.difficulty ===
                                "Easy"
                                  ? "bg-green-500"
                                  : q.difficulty ===
                                    "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }
                            `}
                            >
                              {q.difficulty}
                            </div>

                            <div className="bg-black text-white px-3 py-1 rounded-full text-sm">
                              {q.marks} Marks
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}