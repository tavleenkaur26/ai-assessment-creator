import { create } from "zustand";

interface AssignmentStore {
  assignmentId: string;
  setAssignmentId: (id: string) => void;
}

export const useAssignmentStore =
  create<AssignmentStore>((set) => ({
    assignmentId: "",
    setAssignmentId: (id) =>
      set({ assignmentId: id }),
  }));