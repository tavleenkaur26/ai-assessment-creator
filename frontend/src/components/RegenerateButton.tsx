"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegenerateButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const handleRegenerate = async () => {
    try {
      await axios.post(
        `http://localhost:5001/assignments/${id}/regenerate`
      );

      router.refresh();
    } catch (error) {
      console.log(error);
      alert("Regeneration failed");
    }
  };

  return (
    <button
      onClick={handleRegenerate}
      className="bg-blue-600 text-white px-5 py-3 rounded-xl"
    >
      Regenerate Assessment
    </button>
  );
}